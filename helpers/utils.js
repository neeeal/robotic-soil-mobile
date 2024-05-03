export const GET_RANDOM_COLOR = (marker) => {
    console.log(marker)
    const colors = ['red',
    'tomato',
    'orange',
    'yellow',
    'gold',
    'wheat',
    'tan',
    'linen',
    'green',
    'blue',
    'aqua',
    'violet',
    'indigo']
    return colors[parseInt(marker.mapId)%13]
  }