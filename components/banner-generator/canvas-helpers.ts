export interface BannerData {
  claim: string
  description: string
  ctaText: string
  mobileText: string
  brandColor: string
  accentColor: string
  textColor: string
  ctaTextColor: string
  overlayOpacity: number
  logoBgWhite: boolean
}

export function hexToRgba(hex: string, a: number): string {
  return `rgba(${parseInt(hex.slice(1, 3), 16)},${parseInt(hex.slice(3, 5), 16)},${parseInt(hex.slice(5, 7), 16)},${a})`
}

export function wrapText(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const lines: string[] = []
  text.split("\n").forEach((p) => {
    const words = p.split(" ")
    let cur = ""
    words.forEach((w) => {
      const test = cur ? cur + " " + w : w
      if (ctx.measureText(test).width > maxW && cur) {
        lines.push(cur)
        cur = w
      } else {
        cur = test
      }
    })
    if (cur) lines.push(cur)
  })
  return lines
}

export function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

export function drawArrow(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
  ctx.beginPath()
  ctx.moveTo(x, y - 4)
  ctx.lineTo(x + 5, y)
  ctx.lineTo(x, y + 4)
  ctx.strokeStyle = color
  ctx.lineWidth = 2
  ctx.stroke()
}

export function drawBg(ctx: CanvasRenderingContext2D, w: number, h: number, bgImg: HTMLImageElement | null) {
  ctx.fillStyle = "#0d1117"
  ctx.fillRect(0, 0, w, h)
  if (!bgImg) return
  const ir = bgImg.width / bgImg.height
  const cr = w / h
  let sw: number, sh: number, sx: number, sy: number
  if (ir > cr) {
    sh = bgImg.height
    sw = sh * cr
    sx = (bgImg.width - sw) / 2
    sy = 0
  } else {
    sw = bgImg.width
    sh = sw / cr
    sx = 0
    sy = (bgImg.height - sh) / 2
  }
  ctx.drawImage(bgImg, sx, sy, sw, sh, 0, 0, w, h)
}

export function drawOverlay(ctx: CanvasRenderingContext2D, w: number, h: number, d: BannerData, dir: string) {
  const op = d.overlayOpacity / 100
  const g = dir === "vertical" ? ctx.createLinearGradient(0, 0, 0, h) : ctx.createLinearGradient(0, 0, w, h)
  if (dir === "vertical") {
    g.addColorStop(0, hexToRgba(d.brandColor, op * 0.3))
    g.addColorStop(0.35, hexToRgba(d.brandColor, op * 0.7))
    g.addColorStop(1, hexToRgba(d.brandColor, op))
  } else {
    g.addColorStop(0, hexToRgba(d.brandColor, op * 0.85))
    g.addColorStop(0.5, hexToRgba(d.brandColor, op * 0.6))
    g.addColorStop(1, hexToRgba(d.brandColor, op * 0.9))
  }
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)
}

export function drawLogo(
  ctx: CanvasRenderingContext2D,
  d: BannerData,
  logoImg: HTMLImageElement | null,
  x: number,
  y: number,
  maxW: number,
  maxH: number,
): number {
  if (!logoImg) return 0
  const s = Math.min(maxW / logoImg.width, maxH / logoImg.height, 1)
  const lw = logoImg.width * s
  const lh = logoImg.height * s
  if (d.logoBgWhite) {
    const p = 6
    roundRect(ctx, x - p, y - p, lw + p * 2, lh + p * 2, 4)
    ctx.fillStyle = "rgba(255,255,255,0.92)"
    ctx.fill()
  }
  ctx.save()
  if (!d.logoBgWhite) {
    ctx.shadowColor = "rgba(255,255,255,0.25)"
    ctx.shadowBlur = 10
  }
  ctx.drawImage(logoImg, x, y, lw, lh)
  ctx.restore()
  return lh
}

export function drawLogoCentered(
  ctx: CanvasRenderingContext2D,
  d: BannerData,
  logoImg: HTMLImageElement | null,
  canvasW: number,
  y: number,
  maxW: number,
  maxH: number,
): number {
  if (!logoImg) return 0
  const s = Math.min(maxW / logoImg.width, maxH / logoImg.height, 1)
  const lw = logoImg.width * s
  const lh = logoImg.height * s
  const x = (canvasW - lw) / 2
  if (d.logoBgWhite) {
    const p = 6
    roundRect(ctx, x - p, y - p, lw + p * 2, lh + p * 2, 4)
    ctx.fillStyle = "rgba(255,255,255,0.92)"
    ctx.fill()
  }
  ctx.save()
  if (!d.logoBgWhite) {
    ctx.shadowColor = "rgba(255,255,255,0.25)"
    ctx.shadowBlur = 10
  }
  ctx.drawImage(logoImg, x, y, lw, lh)
  ctx.restore()
  return lh
}

export function drawCTA(
  ctx: CanvasRenderingContext2D,
  d: BannerData,
  x: number,
  y: number,
  w: number,
  h: number,
  centered: boolean,
) {
  roundRect(ctx, x, y, w, h, 5)
  ctx.fillStyle = d.accentColor
  ctx.fill()
  ctx.fillStyle = d.ctaTextColor
  ctx.textBaseline = "middle"
  if (centered) {
    ctx.textAlign = "center"
    ctx.fillText(d.ctaText, x + w / 2, y + h / 2)
    const tw = ctx.measureText(d.ctaText).width
    drawArrow(ctx, x + w / 2 + tw / 2 + 8, y + h / 2, d.ctaTextColor)
    ctx.textAlign = "left"
  } else {
    const tw2 = ctx.measureText(d.ctaText).width
    ctx.fillText(d.ctaText, x + (w - tw2) / 2, y + h / 2)
    drawArrow(ctx, x + (w + tw2) / 2 + 8, y + h / 2, d.ctaTextColor)
  }
  ctx.textBaseline = "top"
}
