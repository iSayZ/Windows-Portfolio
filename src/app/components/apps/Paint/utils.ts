export function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;
  
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;
  
      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.stroke();
  }
  
  export function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    const topCurveHeight = height * 0.3;
    ctx.beginPath();
    ctx.moveTo(x + width / 2, y + topCurveHeight);
    
    // Left curve
    ctx.bezierCurveTo(
      x, y, 
      x, y + topCurveHeight, 
      x + width / 2, y + height
    );
    
    // Right curve
    ctx.bezierCurveTo(
      x + width, y + topCurveHeight, 
      x + width, y, 
      x + width / 2, y + topCurveHeight
    );
    
    ctx.stroke();
  }