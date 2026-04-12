"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { type BannerData } from "./canvas-helpers"
import { FORMATS, layouts } from "./canvas-layouts"

function loadImg(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.src = e.target!.result as string
    }
    reader.readAsDataURL(file)
  })
}

function canvasToJpg(canvas: HTMLCanvasElement, maxBytes: number | null) {
  const w = canvas.width / 2
  const h = canvas.height / 2
  const tmp = document.createElement("canvas")
  tmp.width = w
  tmp.height = h
  const tctx = tmp.getContext("2d")!
  tctx.fillStyle = "#ffffff"
  tctx.fillRect(0, 0, w, h)
  tctx.drawImage(canvas, 0, 0, w, h)
  if (!maxBytes) {
    const dataUrl = tmp.toDataURL("image/jpeg", 0.92)
    const size = Math.round((dataUrl.length - 23) * 0.75)
    return { dataUrl, quality: 0.92, size }
  }
  let lo = 0.1,
    hi = 0.95,
    best: { dataUrl: string; quality: number; size: number } | null = null
  for (let i = 0; i < 12; i++) {
    const mid = (lo + hi) / 2
    const du = tmp.toDataURL("image/jpeg", mid)
    const sz = Math.round((du.length - 23) * 0.75)
    if (sz <= maxBytes) {
      best = { dataUrl: du, quality: mid, size: sz }
      lo = mid
    } else {
      hi = mid
    }
  }
  if (!best) {
    const du2 = tmp.toDataURL("image/jpeg", 0.1)
    const sz2 = Math.round((du2.length - 23) * 0.75)
    best = { dataUrl: du2, quality: 0.1, size: sz2 }
  }
  return best
}

function dataUrlToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(",")
  const mime = parts[0].match(/:(.*?);/)![1]
  const raw = atob(parts[1])
  const arr = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i)
  return new Blob([arr], { type: mime })
}

export default function BannerGenerator() {
  const [activeFormat, setActiveFormat] = useState("300x600")
  const [claim, setClaim] = useState("Tepelné čerpadlo\nza nejlepší cenu")
  const [desc, setDesc] = useState("Ušetřete až 70 % nákladů na vytápění. Certifikovaná instalace s dotací.")
  const [ctaText, setCtaText] = useState("Spočítat cenu")
  const [brandColor, setBrandColor] = useState("#00843D")
  const [accentColor, setAccentColor] = useState("#FFD600")
  const [overlay, setOverlay] = useState(55)
  const [logoBgWhite, setLogoBgWhite] = useState(false)
  const [ctaTextWhite, setCtaTextWhite] = useState(false)
  const [mobileManual, setMobileManual] = useState(false)
  const [mobileText, setMobileText] = useState("Tepelné čerpadlo — ušetřete 70 %")
  const [aiPrompt, setAiPrompt] = useState("")
  const [aiStatus, setAiStatus] = useState("")
  const [aiLoading, setAiLoading] = useState(false)
  const [imagePrompt, setImagePrompt] = useState("")
  const [copyStatus, setCopyStatus] = useState("")
  const [downloadHints, setDownloadHints] = useState<Record<string, string>>({})
  const [zipStatus, setZipStatus] = useState("")
  const [zipLoading, setZipLoading] = useState(false)

  const logoImgRef = useRef<HTMLImageElement | null>(null)
  const bgImgRef = useRef<HTMLImageElement | null>(null)
  const [hasLogo, setHasLogo] = useState(false)
  const [hasBg, setHasBg] = useState(false)
  const logoInputRef = useRef<HTMLInputElement>(null)
  const bgInputRef = useRef<HTMLInputElement>(null)
  const canvasRefs = useRef<Record<string, HTMLCanvasElement | null>>({})

  const getData = useCallback((): BannerData => {
    return {
      claim,
      description: desc,
      ctaText,
      mobileText: mobileManual ? mobileText : "",
      brandColor,
      accentColor,
      textColor: "#FFFFFF",
      ctaTextColor: ctaTextWhite ? "#FFFFFF" : "#1a1a1a",
      overlayOpacity: overlay,
      logoBgWhite,
    }
  }, [claim, desc, ctaText, mobileManual, mobileText, brandColor, accentColor, ctaTextWhite, overlay, logoBgWhite])

  const renderAll = useCallback(() => {
    const data = getData()
    Object.keys(FORMATS).forEach((key) => {
      const f = FORMATS[key]
      const canvas = canvasRefs.current[key]
      if (!canvas) return
      canvas.width = f.width * 2
      canvas.height = f.height * 2
      canvas.style.width = f.width + "px"
      canvas.style.height = f.height + "px"
      const ctx = canvas.getContext("2d")!
      ctx.scale(2, 2)
      layouts[f.type](ctx, f.width, f.height, data, logoImgRef.current, bgImgRef.current)
    })
  }, [getData])

  useEffect(() => {
    renderAll()
  }, [renderAll])

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    logoImgRef.current = await loadImg(file)
    setHasLogo(true)
  }

  const handleBgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    bgImgRef.current = await loadImg(file)
    setHasBg(true)
  }

  const clearLogo = () => {
    logoImgRef.current = null
    if (logoInputRef.current) logoInputRef.current.value = ""
    setHasLogo(false)
  }

  const clearBg = () => {
    bgImgRef.current = null
    if (bgInputRef.current) bgInputRef.current.value = ""
    setHasBg(false)
  }

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) {
      setAiStatus("Zadej popis toho, co chceš propagovat.")
      return
    }
    setAiLoading(true)
    setAiStatus("Claude generuje texty pro bannery\u2026")

    const systemPrompt =
      "Jsi expert na PPC reklamu a copywriting v češtině. " +
      "Uživatel ti dá popis produktu/akce a ty vygeneruješ texty pro PPC bannery. " +
      "Odpověz POUZE platným JSON objektem (bez markdown, bez backticků, bez komentářů), " +
      "s těmito klíči:\n" +
      '- "claim": hlavní titulek banneru, max 40 znaků, 2 řádky oddělené \\n\n' +
      '- "description": popisek, max 80 znaků, 1-2 věty\n' +
      '- "cta": text tlačítka, max 15 znaků\n' +
      '- "mobileText": ultra krátký text pro 320x50 banner BEZ loga, max 30 znaků, musí být úderný a jasný\n' +
      '- "imagePrompt": prompt v angličtině pro vygenerování fotorealistického obrázku na pozadí PPC banneru (DALL-E / Midjourney). ' +
      "Popiš scénu která vizuálně reprezentuje propagovaný produkt/službu. " +
      "Styl: moderní, čistý, profesionální, světlé barvy, vhodné jako pozadí banneru (ne příliš rušivé). " +
      "Max 120 slov. NIKDY nepoužívej text, písmena nebo slova v obrázku.\n" +
      "Všechny texty (kromě imagePrompt) piš v češtině. " +
      "Používej akční jazyk, čísla a konkrétní benefity. " +
      "Buď střízlivý, profesionální, bez vykřičníků."

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: "user", content: "Vygeneruj PPC texty pro tyto bannery. Propagujeme: " + aiPrompt }],
        }),
      })
      const data = await res.json()
      let text = ""
      if (data.content) {
        data.content.forEach((block: { type: string; text: string }) => {
          if (block.type === "text") text += block.text
        })
      }
      text = text.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim()
      const result = JSON.parse(text)

      if (result.claim) setClaim(result.claim)
      if (result.description) setDesc(result.description)
      if (result.cta) setCtaText(result.cta)
      if (result.mobileText) {
        setMobileText(result.mobileText)
        setMobileManual(true)
      }
      if (result.imagePrompt) {
        setImagePrompt(result.imagePrompt)
        setAiStatus("✓ Texty vygenerovány. Prompt pro obrázek je níže — zkopíruj ho do ChatGPT / DALL-E.")
      } else {
        setAiStatus("✓ Texty vygenerovány. Můžeš je upravit.")
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Nepodařilo se vygenerovat texty."
      setAiStatus("✕ Chyba: " + message)
    } finally {
      setAiLoading(false)
    }
  }

  const copyImagePromptToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(imagePrompt)
      setCopyStatus("✓ Zkopírováno!")
    } catch {
      setCopyStatus("✓ Zkopírováno!")
    }
    setTimeout(() => setCopyStatus(""), 3000)
  }

  const downloadJpg = (format: string) => {
    const canvas = canvasRefs.current[format]
    if (!canvas) return
    const limit = format === "1200x628" ? null : 102400
    const result = canvasToJpg(canvas, limit)
    const a = document.createElement("a")
    a.download = `banner-${format}.jpg`
    a.href = result.dataUrl
    a.click()
    const kb = (result.size / 1024).toFixed(1)
    const q = Math.round(result.quality * 100)
    setDownloadHints((prev) => ({
      ...prev,
      [format]: `✓ ${kb} KB · kvalita ${q}% · ${FORMATS[format].width}\u00D7${FORMATS[format].height} px`,
    }))
  }

  const downloadPng = (format: string) => {
    const canvas = canvasRefs.current[format]
    if (!canvas) return
    const a = document.createElement("a")
    a.download = `banner-${format}.png`
    a.href = canvas.toDataURL("image/png")
    a.click()
    setDownloadHints((prev) => ({
      ...prev,
      [format]: `PNG retina: ${FORMATS[format].width * 2}\u00D7${FORMATS[format].height * 2} px`,
    }))
  }

  const downloadZip = async (type: "jpg" | "png") => {
    setZipLoading(true)
    setZipStatus("Generuji archiv\u2026")
    const JSZip = (await import("jszip")).default
    const zip = new JSZip()
    const folder = zip.folder(`bannery-${type}`)!
    Object.keys(FORMATS).forEach((f) => {
      const canvas = canvasRefs.current[f]
      if (!canvas) return
      if (type === "jpg") {
        const limit = f === "1200x628" ? null : 102400
        const result = canvasToJpg(canvas, limit)
        folder.file(`banner-${f}.jpg`, dataUrlToBlob(result.dataUrl))
      } else {
        folder.file(`banner-${f}.png`, dataUrlToBlob(canvas.toDataURL("image/png")))
      }
    })
    const content = await zip.generateAsync({ type: "blob" })
    const a = document.createElement("a")
    a.download = `bannery-${type}.zip`
    a.href = URL.createObjectURL(content)
    a.click()
    URL.revokeObjectURL(a.href)
    setZipStatus(`✓ ZIP stažen: ${(content.size / 1024).toFixed(0)} KB (${Object.keys(FORMATS).length} bannerů)`)
    setZipLoading(false)
  }

  return (
    <div className="min-h-screen" style={{ background: "#0d1117", color: "#e6edf3", fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4" style={{ borderBottom: "1px solid #21262d" }}>
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-lg font-extrabold"
          style={{ background: "linear-gradient(135deg, #00843D, #00a34a)" }}
        >
          B
        </div>
        <div>
          <div className="font-bold text-base">PPC Banner Generator</div>
          <div className="text-xs" style={{ color: "#8b949e" }}>
            7 formátů · AI texty · ZIP export
          </div>
        </div>
      </div>

      {/* App layout */}
      <div className="flex flex-col md:flex-row" style={{ minHeight: "calc(100vh - 69px)" }}>
        {/* Panel */}
        <div
          className="w-full md:w-[380px] md:min-w-[380px] overflow-y-auto flex flex-col gap-[18px] p-6"
          style={{ borderRight: "1px solid #21262d" }}
        >
          {/* AI Section */}
          <div className="rounded-[10px] p-4" style={{ background: "linear-gradient(135deg, #1a1040, #0d1117)", border: "1px solid rgba(124,58,237,0.27)" }}>
            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#a78bfa" }}>
              ✨ AI asistent — zadej co propagovat
            </label>
            <textarea
              rows={3}
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Např: Akce na tepelná čerpadla ACOND se slevou 20%, montáž do 14 dnů"
              className="w-full p-[10px_12px] rounded-md text-sm outline-none"
              style={{ background: "#0d1117", border: "1px solid rgba(124,58,237,0.27)", color: "#e6edf3", fontFamily: "inherit" }}
            />
            <button
              onClick={handleAiGenerate}
              disabled={aiLoading}
              className="w-full mt-2.5 py-[11px] px-5 rounded-md text-white text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-wait"
              style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)", border: "none" }}
            >
              <span>{aiLoading ? "\u23F3" : "\u2728"}</span>
              <span>{aiLoading ? "Generuji\u2026" : "Vygenerovat texty"}</span>
            </button>
            {aiStatus && (
              <div className="text-xs mt-2 min-h-[18px]" style={{ color: "#a78bfa" }}>
                {aiStatus}
              </div>
            )}
            {imagePrompt && (
              <div className="mt-2.5">
                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#a78bfa" }}>
                  Prompt pro obrázek (zkopíruj do ChatGPT / DALL-E / Midjourney)
                </label>
                <textarea
                  readOnly
                  rows={3}
                  value={imagePrompt}
                  className="w-full p-[9px_12px] rounded-md text-[13px] outline-none cursor-text"
                  style={{ background: "#0d1117", border: "1px solid rgba(124,58,237,0.27)", color: "#e6edf3", fontFamily: "inherit" }}
                />
                <div className="flex items-center gap-2 mt-1.5">
                  <button
                    onClick={copyImagePromptToClipboard}
                    className="py-[7px] px-4 rounded-md text-xs font-semibold cursor-pointer"
                    style={{ border: "1px solid rgba(124,58,237,0.27)", background: "transparent", color: "#a78bfa" }}
                  >
                    📋 Zkopírovat prompt
                  </button>
                  {copyStatus && (
                    <span className="text-[11px]" style={{ color: "#484f58" }}>
                      {copyStatus}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="h-px" style={{ background: "#21262d" }} />

          {/* Logo */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>
              Logo (PNG / SVG)
            </label>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="w-full p-2 rounded-md text-[13px] cursor-pointer"
              style={{ border: "1px solid #21262d", background: "#161b22", color: "#e6edf3" }}
            />
            <div className="flex items-center gap-2.5 mt-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={logoBgWhite} onChange={(e) => setLogoBgWhite(e.target.checked)} className="sr-only peer" />
                <div className="w-[42px] h-6 rounded-full peer-checked:after:translate-x-[18px] after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-[#e6edf3] after:rounded-full after:w-[18px] after:h-[18px] after:transition-all" style={{ background: logoBgWhite ? "#00843D" : "#30363d" }} />
              </label>
              <span className="text-[13px]" style={{ color: "#8b949e" }}>Bílé pozadí za logem</span>
              {hasLogo && (
                <button onClick={clearLogo} className="py-1 px-2.5 rounded text-[11px] cursor-pointer whitespace-nowrap" style={{ border: "1px solid #da3633", background: "transparent", color: "#da3633" }}>
                  ✕ Smazat logo
                </button>
              )}
            </div>
          </div>

          {/* Background */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>
              Obrázek na pozadí
            </label>
            <input
              ref={bgInputRef}
              type="file"
              accept="image/*"
              onChange={handleBgUpload}
              className="w-full p-2 rounded-md text-[13px] cursor-pointer"
              style={{ border: "1px solid #21262d", background: "#161b22", color: "#e6edf3" }}
            />
            {hasBg && (
              <button onClick={clearBg} className="mt-1.5 py-1 px-2.5 rounded text-[11px] cursor-pointer" style={{ border: "1px solid #da3633", background: "transparent", color: "#da3633" }}>
                ✕ Smazat pozadí
              </button>
            )}
          </div>

          <div className="h-px" style={{ background: "#21262d" }} />

          {/* Texts */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>Hlavní claim</label>
            <textarea rows={3} value={claim} onChange={(e) => setClaim(e.target.value)} className="w-full p-[10px_12px] rounded-md text-sm outline-none" style={{ border: "1px solid #21262d", background: "#161b22", color: "#e6edf3", fontFamily: "inherit", resize: "vertical" }} />
            <div className="text-[11px] mt-1" style={{ color: "#484f58" }}>Nový řádek = zalomení v banneru</div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>Popisek</label>
            <textarea rows={2} value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full p-[10px_12px] rounded-md text-sm outline-none" style={{ border: "1px solid #21262d", background: "#161b22", color: "#e6edf3", fontFamily: "inherit", resize: "vertical" }} />
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>Text CTA tlačítka</label>
            <input type="text" value={ctaText} onChange={(e) => setCtaText(e.target.value)} className="w-full p-[10px_12px] rounded-md text-sm outline-none" style={{ border: "1px solid #21262d", background: "#161b22", color: "#e6edf3" }} />
          </div>

          <div className="h-px" style={{ background: "#21262d" }} />

          {/* Colors */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>Barva značky</label>
              <div className="flex items-center gap-2">
                <input type="color" value={brandColor} onChange={(e) => setBrandColor(e.target.value)} className="w-9 h-9 border-none rounded-md cursor-pointer bg-transparent" />
                <span className="text-[13px]" style={{ color: "#8b949e" }}>{brandColor}</span>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>Accent / CTA pozadí</label>
              <div className="flex items-center gap-2">
                <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="w-9 h-9 border-none rounded-md cursor-pointer bg-transparent" />
                <span className="text-[13px]" style={{ color: "#8b949e" }}>{accentColor}</span>
              </div>
            </div>
          </div>

          {/* CTA text color toggle */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>Barva textu CTA</label>
            <div className="flex items-center gap-2.5">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={ctaTextWhite} onChange={(e) => setCtaTextWhite(e.target.checked)} className="sr-only peer" />
                <div className="w-[42px] h-6 rounded-full peer-checked:after:translate-x-[18px] after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-[#e6edf3] after:rounded-full after:w-[18px] after:h-[18px] after:transition-all" style={{ background: ctaTextWhite ? "#00843D" : "#30363d" }} />
              </label>
              <span className="text-[13px]" style={{ color: "#8b949e" }}>{ctaTextWhite ? "Bílý text" : "Tmavý text (výchozí)"}</span>
            </div>
          </div>

          {/* Overlay */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#8b949e" }}>
              Překrytí pozadí: {overlay}%
            </label>
            <input type="range" min={0} max={100} value={overlay} onChange={(e) => setOverlay(parseInt(e.target.value))} className="w-full" style={{ accentColor: "#00843D" }} />
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 p-7 overflow-y-auto" style={{ background: "#010409" }}>
          {/* Batch ZIP */}
          <div className="flex gap-2.5 items-center flex-wrap mb-6">
            <button
              onClick={() => downloadZip("jpg")}
              disabled={zipLoading}
              className="py-2.5 px-6 rounded-md text-white text-[13px] font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-wait"
              style={{ background: "#7c3aed", border: "none" }}
            >
              📦 ZIP (JPG)
            </button>
            <button
              onClick={() => downloadZip("png")}
              disabled={zipLoading}
              className="py-2.5 px-6 rounded-md text-white text-[13px] font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-wait"
              style={{ background: "#059669", border: "none" }}
            >
              📦 ZIP (PNG retina)
            </button>
            {zipStatus && (
              <span className="text-xs" style={{ color: "#484f58" }}>
                {zipStatus}
              </span>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-1.5 mb-6 flex-wrap">
            {Object.keys(FORMATS).map((key) => (
              <button
                key={key}
                onClick={() => setActiveFormat(key)}
                className="py-[7px] px-[14px] rounded-md text-xs cursor-pointer whitespace-nowrap transition-all"
                style={{
                  border: activeFormat === key ? "2px solid #00843D" : "1px solid #30363d",
                  background: activeFormat === key ? "#161b22" : "transparent",
                  color: activeFormat === key ? "#e6edf3" : "#8b949e",
                  fontWeight: activeFormat === key ? 700 : 400,
                }}
              >
                {FORMATS[key].label}
              </button>
            ))}
          </div>

          {/* Canvas previews */}
          {Object.keys(FORMATS).map((key) => (
            <div key={key} style={{ display: key === activeFormat ? "block" : "none" }}>
              <div className="inline-block rounded-lg overflow-hidden" style={{ border: "1px solid #21262d", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                <canvas ref={(el) => { canvasRefs.current[key] = el }} />
              </div>

              {/* 320x50 mobile manual override */}
              {key === "320x50" && (
                <div className="mt-4 p-[14px_16px] rounded-lg" style={{ background: "#161b22", border: "1px solid #21262d" }}>
                  <div className="flex items-center gap-2.5 mb-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={mobileManual} onChange={(e) => setMobileManual(e.target.checked)} className="sr-only peer" />
                      <div className="w-[42px] h-6 rounded-full peer-checked:after:translate-x-[18px] after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-[#e6edf3] after:rounded-full after:w-[18px] after:h-[18px] after:transition-all" style={{ background: mobileManual ? "#00843D" : "#30363d" }} />
                    </label>
                    <span className="text-[13px]" style={{ color: "#8b949e" }}>Upravit text ručně</span>
                  </div>
                  {mobileManual && (
                    <div>
                      <input
                        type="text"
                        value={mobileText}
                        onChange={(e) => setMobileText(e.target.value)}
                        className="w-full p-[9px_12px] rounded-md text-sm outline-none"
                        style={{ border: "1px solid #21262d", background: "#0d1117", color: "#e6edf3", fontFamily: "inherit" }}
                      />
                      <div className="text-[11px] mt-1" style={{ color: "#484f58" }}>Max ~35 znaků · bez loga, jen text + CTA</div>
                    </div>
                  )}
                </div>
              )}

              {/* Download buttons */}
              <div className="flex items-center gap-2.5 flex-wrap mt-4">
                <button
                  onClick={() => downloadJpg(key)}
                  className="py-[9px] px-5 rounded-md text-white text-[13px] font-semibold cursor-pointer hover:opacity-85"
                  style={{ background: "#2563eb", border: "none" }}
                >
                  ⬇ JPG{key !== "1200x628" ? " (≤100 KB)" : ""}
                </button>
                <button
                  onClick={() => downloadPng(key)}
                  className="py-[9px] px-5 rounded-md text-white text-[13px] font-semibold cursor-pointer hover:opacity-85"
                  style={{ background: "#00843D", border: "none" }}
                >
                  ⬇ PNG retina
                </button>
                {downloadHints[key] && (
                  <span className="text-xs" style={{ color: "#484f58" }}>
                    {downloadHints[key]}
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Info box */}
          <div className="mt-10 p-[16px_20px] rounded-lg text-[13px] leading-[1.7]" style={{ background: "#161b22", border: "1px solid #21262d", color: "#8b949e" }}>
            <strong style={{ color: "#e6edf3" }}>Formáty:</strong> 300×250 · 728×90 · 160×600 · 300×600 · 320×50 · 480×480 · 1200×628
            <br />
            <strong style={{ color: "#e6edf3" }}>AI:</strong> Zadej popis akce/produktu → AI vygeneruje optimální texty pro všechny formáty
            <br />
            <strong style={{ color: "#e6edf3" }}>320×50:</strong> Bez loga, vlastní krátký text (AI generuje automaticky)
            <br />
            <strong style={{ color: "#e6edf3" }}>JPG:</strong> Pod 100 KB (kromě 1200×628) · <strong style={{ color: "#e6edf3" }}>PNG:</strong> 2× retina
          </div>
        </div>
      </div>
    </div>
  )
}
