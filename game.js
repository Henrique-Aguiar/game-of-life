function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

function rectangle(ctx, x, y, larg, alt, corBorda, corInterna) {
  ctx.fillStyle = corInterna
  ctx.strokeStyle = corBorda
  if(corInterna) ctx.fillRect(x, y, larg, alt)
  if(corBorda) ctx.strokeRect(x, y, larg, alt)
}

export { getRandomInt, rectangle }