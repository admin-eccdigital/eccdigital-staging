import {
  type BannerData,
  hexToRgba,
  wrapText,
  roundRect,
  drawBg,
  drawOverlay,
  drawLogo,
  drawLogoCentered,
  drawCTA,
} from "./canvas-helpers"

export const FORMATS: Record<string, { width: number; height: number; label: string; type: string }> = {
  "300x250": { width: 300, height: 250, label: "300\u00D7250", type: "medium" },
  "728x90": { width: 728, height: 90, label: "728\u00D790", type: "leaderboard" },
  "160x600": { width: 160, height: 600, label: "160\u00D7600", type: "skyscraper" },
  "300x600": { width: 300, height: 600, label: "300\u00D7600", type: "vertical" },
  "320x50": { width: 320, height: 50, label: "320\u00D750", type: "mobile" },
  "480x480": { width: 480, height: 480, label: "480\u00D7480", type: "square" },
  "1200x628": { width: 1200, height: 628, label: "1200\u00D7628", type: "social" },
}

type LayoutFn = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  d: BannerData,
  logoImg: HTMLImageElement | null,
  bgImg: HTMLImageElement | null,
) => void

export const layouts: Record<string, LayoutFn> = {
  medium(ctx, w, h, d, logoImg, bgImg) {
    const pad = 20
    drawBg(ctx, w, h, bgImg)
    drawOverlay(ctx, w, h, d, "diagonal")
    ctx.fillStyle = hexToRgba(d.accentColor, 0.9)
    ctx.fillRect(0, h - 4, w, 4)
    const logoH = drawLogo(ctx, d, logoImg, pad, pad, 100, 32)
    let y = pad + (logoH ? logoH + 14 : 0)
    ctx.fillStyle = d.textColor
    ctx.font = "800 22px 'Segoe UI','Helvetica Neue',Arial,sans-serif"
    ctx.textBaseline = "top"
    wrapText(ctx, d.claim, w - pad * 2).forEach((l) => {
      ctx.fillText(l, pad, y)
      y += 27
    })
    y += 6
    ctx.fillStyle = d.accentColor
    ctx.fillRect(pad, y, 40, 3)
    y += 14
    ctx.fillStyle = hexToRgba(d.textColor, 0.85)
    ctx.font = "400 12px 'Segoe UI','Helvetica Neue',Arial,sans-serif"
    wrapText(ctx, d.description, w - pad * 2).forEach((l) => {
      ctx.fillText(l, pad, y)
      y += 16
    })
    ctx.font = "700 13px 'Segoe UI','Helvetica Neue',Arial,sans-serif"
    drawCTA(ctx, d, pad, h - pad - 36, w - pad * 2, 36, false)
  },

  leaderboard(ctx, w, h, d, logoImg, bgImg) {
    const pad = 16
    drawBg(ctx, w, h, bgImg)
    drawOverlay(ctx, w, h, d, "diagonal")
    ctx.fillStyle = hexToRgba(d.accentColor, 0.9)
    ctx.fillRect(0, h - 3, w, 3)
    const logoZone = 120
    const ctaZone = 170
    const textX = logoZone + 10
    const textW = w - textX - ctaZone - 10
    drawLogo(ctx, d, logoImg, pad, (h - 30) / 2, logoZone - pad * 2, 30)
    ctx.fillStyle = hexToRgba(d.accentColor, 0.7)
    ctx.fillRect(logoZone, pad, 2, h - pad * 2)
    let y = pad + 4
    ctx.fillStyle = d.textColor
    ctx.font = "800 20px 'Segoe UI','Helvetica Neue',Arial,sans-serif"
    ctx.textBaseline = "top"
    wrapText(ctx, d.claim, textW).forEach((l) => {
      ctx.fillText(l, textX + 12, y)
      y += 24
    })
    ctx.fillStyle = hexToRgba(d.textColor, 0.8)
    ctx.font = "400 12px 'Segoe UI','Helvetica Neue',Arial,sans-serif"
    wrapText(ctx, d.description, textW)
      .slice(0, 1)
      .forEach((l) => {
        ctx.fillText(l, textX + 12, y + 2)
      })
    ctx.font = "700 14px 'Segoe UI','Helvetica Neue',Arial,sans-serif"
    drawCTA(ctx, d, w - ctaZone - pad + 10, (h - 40) / 2, ctaZone - 10, 40, true)
  },

  skyscraper(ctx, w, h, d, logoImg, bgImg) {
    const pad = 20
    drawBg(ctx, w, h, bgImg)
    const op = d.overlayOpacity / 100
    const g = ctx.createLinearGradient(0, 0, 0, h)
    g.addColorStop(0, hexToRgba(d.brandColor, op * 0.95))
    g.addColorStop(0.55, hexToRgba(d.brandColor, op * 0.8))
    g.addColorStop(0.7, hexToRgba(d.brandColor, op * 0.35))
    g.addColorStop(1, hexToRgba(d.brandColor, op * 0.1))
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = hexToRgba(d.accentColor, 0.9)
    ctx.fillRect(0, 0, 4, h)
    const logoH = drawLogo(ctx, d, logoImg, pad, pad + 8, w - pad * 2, 34)
    let y = pad + 8 + (logoH ? logoH + 32 : 0)
    ctx.fillStyle = d.textColor
    ctx.font = "800 19px 'Segoe UI','Helvetica Neue',Arial,sans-serif"
    ctx.textBaseline = "top"
    wrapText(ctx, d.claim, w - pad * 2).forEach((l) => {
      ctx.fillText(l, pad, y)
      y += 26
    })
    y += 20
    ctx.fillStyle = d.accentColor
    ctx.fillRect(pad, y, 36, 3)
    y += 24
    ctx.fillStyle = hexToRgba(d.textColor, 0.85)
    ctx.font = "400 12.5px 'Segoe UI','Helvetica Neue',Arial,sans-serif"
    wrapText(ctx, d.description, w - pad * 2).forEach((l) => {
      ctx.fillText(l, pad, y)
      y += 20
    })
    ctx.font = "700 13px 'Segoe UI','Helvetica Neue',Arial,sans-serif"
    drawCTA(ctx, d, pad, h - pad - 12 - 42, w - pad * 2, 42, false)
  },

  vertical(ctx, w, h, d, logoImg, bgImg) {
    const pad = 28
    drawBg(ctx, w, h, bgImg)
    const op = d.overlayOpacity / 100
    const g = ctx.createLinearGradient(0, 0, 0, h)
    g.addColorStop(0, hexToRgba(d.brandColor, op * 0.95))
    g.addColorStop(0.5, hexToRgba(d.brandColor, op * 0.75))
    g.addColorStop(0.7, hexToRgba(d.brandColor, op * 0.3))
    g.addColorStop(1, hexToRgba(d.brandColor, op * 0.08))
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = hexToRgba(d.accentColor, 0.9)
    ctx.fillRect(0, 0, 5, h)
    const logoH = drawLogo(ctx, d, logoImg, pad, pad + 4, w - pad * 2, 44)
    let y = pad + 4 + (logoH ? logoH + 36 : 0)
    ctx.fillStyle = d.textColor
    ctx.font = "800 27px 'Segoe UI','Helvetica Neue',Arial,sans-serif"
    ctx.textBaseline = "top"
    wrapText(ctx, d.claim, w - pad * 2).forEach((l) => {
      ctx.fillText(l, pad, y)
      y += 35
    })
    y += 24
    ctx.fillStyle = d.accentColor
    ctx.fillRect(pad, y, 50, 4)
    y += 30
    ctx.fillStyle = hexToRgba(d.textColor, 0.88)
    ctx.font = "400 14.5px 'Segoe UI','Helvetica Neue',Arial,sans-serif"
    wrapText(ctx, d.description, w - pad * 2).forEach((l) => {
      ctx.fillText(l, pad, y)
      y += 23
    })
    const ctaY = h - pad - 10 - 48
    ctx.save()
    roundRect(ctx, pad - 4, ctaY - 6, w - pad * 2 + 8, 48 + 12, 8)
    ctx.fillStyle = hexToRgba(d.brandColor, 0.5)
    ctx.fill()
    ctx.restore()
    ctx.font = "700 16px 'Segoe UI','Helvetica Neue',Arial,sans-serif"
    drawCTA(ctx, d, pad, ctaY, w - pad * 2, 48, false)
  },

  mobile(ctx, w, h, d, _logoImg, bgImg) {
    const pad = 10
    drawBg(ctx, w, h, bgImg)
    drawOverlay(ctx, w, h, d, "diagonal")
    ctx.fillStyle = hexToRgba(d.accentColor, 0.9)
    ctx.fillRect(0, h - 2, w, 2)
    const ctaW = 100
    const textMaxW = w - ctaW - pad * 3
    ctx.fillStyle = d.textColor
    ctx.font = "700 14px 'Segoe UI','Helvetica Neue',Arial,sans-serif"
    ctx.textBaseline = "middle"
    let txt = d.mobileText || d.claim.replace(/\n/g, " ")
    if (ctx.measureText(txt).width > textMaxW) {
      while (ctx.measureText(txt + "\u2026").width > textMaxW && txt.length > 5) txt = txt.slice(0, -1)
      txt += "\u2026"
    }
    ctx.fillText(txt, pad, h / 2)
    ctx.textBaseline = "top"
    ctx.font = "700 12px 'Segoe UI','Helvetica Neue',Arial,sans-serif"
    drawCTA(ctx, d, w - ctaW - pad, (h - 32) / 2, ctaW, 32, true)
  },

  square(ctx, w, h, d, logoImg, bgImg) {
    const pad = 28
    drawBg(ctx, w, h, bgImg)
    drawOverlay(ctx, w, h, d, "diagonal")
    ctx.fillStyle = hexToRgba(d.accentColor, 0.9)
    ctx.fillRect(0, h - 5, w, 5)
    const btnH = 48
    const btnY = h - pad - btnH
    const logoH = drawLogoCentered(ctx, d, logoImg, w, pad + 10, 180, 48)
    const logoBot = pad + 10 + (logoH ? logoH + 28 : 0)
    ctx.font = "800 32px 'Segoe UI','Helvetica Neue',Arial,sans-serif"
    const claimLines = wrapText(ctx, d.claim, w - pad * 2)
    ctx.font = "400 16px 'Segoe UI','Helvetica Neue',Arial,sans-serif"
    const descLines = wrapText(ctx, d.description, w - pad * 2)
    const textBlockH = claimLines.length * 40 + 10 + 4 + 22 + descLines.length * 23
    const availableH = btnY - logoBot - 20
    let y = logoBot + Math.max(0, (availableH - textBlockH) / 2)
    ctx.fillStyle = d.textColor
    ctx.font = "800 32px 'Segoe UI','Helvetica Neue',Arial,sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    claimLines.forEach((l) => {
      ctx.fillText(l, w / 2, y)
      y += 40
    })
    y += 10
    ctx.fillStyle = d.accentColor
    ctx.fillRect(w / 2 - 30, y, 60, 4)
    y += 22
    ctx.fillStyle = hexToRgba(d.textColor, 0.88)
    ctx.font = "400 16px 'Segoe UI','Helvetica Neue',Arial,sans-serif"
    descLines.forEach((l) => {
      ctx.fillText(l, w / 2, y)
      y += 23
    })
    ctx.textAlign = "left"
    ctx.font = "700 17px 'Segoe UI','Helvetica Neue',Arial,sans-serif"
    drawCTA(ctx, d, (w - 220) / 2, btnY, 220, btnH, true)
  },

  social(ctx, w, h, d, logoImg, bgImg) {
    const pad = 56
    drawBg(ctx, w, h, bgImg)
    ctx.fillStyle = hexToRgba(d.accentColor, 0.9)
    ctx.fillRect(0, h - 6, w, 6)
    const leftW = w * 0.52
    const lg = ctx.createLinearGradient(0, 0, leftW + 160, 0)
    lg.addColorStop(0, hexToRgba(d.brandColor, 0.92))
    lg.addColorStop(0.6, hexToRgba(d.brandColor, 0.78))
    lg.addColorStop(0.85, hexToRgba(d.brandColor, 0.3))
    lg.addColorStop(1, hexToRgba(d.brandColor, 0))
    ctx.fillStyle = lg
    ctx.fillRect(0, 0, leftW + 160, h)
    ctx.fillStyle = hexToRgba(d.brandColor, 0.08)
    ctx.fillRect(0, 0, w, h)
    const logoH = drawLogo(ctx, d, logoImg, pad, pad, 200, 52)
    let y = pad + (logoH ? logoH + 40 : 0)
    ctx.fillStyle = d.textColor
    ctx.font = "800 42px 'Segoe UI','Helvetica Neue',Arial,sans-serif"
    ctx.textBaseline = "top"
    wrapText(ctx, d.claim, leftW - pad - 16).forEach((l) => {
      ctx.fillText(l, pad, y)
      y += 56
    })
    y += 20
    ctx.fillStyle = d.accentColor
    ctx.fillRect(pad, y, 70, 5)
    y += 36
    ctx.fillStyle = hexToRgba(d.textColor, 0.88)
    ctx.font = "400 19px 'Segoe UI','Helvetica Neue',Arial,sans-serif"
    wrapText(ctx, d.description, leftW - pad - 16).forEach((l) => {
      ctx.fillText(l, pad, y)
      y += 30
    })
    ctx.font = "700 19px 'Segoe UI','Helvetica Neue',Arial,sans-serif"
    drawCTA(ctx, d, pad, h - pad - 14 - 54, 260, 54, true)
  },
}
