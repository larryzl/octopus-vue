const axios = require('axios')


const getZhihuColumn = async (id) => {
  const url = `https://zhuanlan.zhihu.com/api/columns/${id}`
  const response = await axios.get(url)
  return await response.data
}

// (async () => {
//   const data = await getZhihuColumn('feweekly')
//   console.log(`TITLE: ${data['title']}`)
//   console.log(`INTRO: ${data['intro']}`)
//
// })()


const result = async () => {
  const data = await getZhihuColumn('feweekly')
  console.log(`TITLE: ${data['title']}`)
  console.log(`INTRO: ${data['intro']}`)
}

async function task1(){
  return await new Promise(resolve => {
    setTimeout(()=>{
      return 'aaa'
      resolve('done')
    },3000)
  })
}


const getData = async () => {
  let b = 'b'
  await new Promise(resolve => {
    setTimeout(()=>{
      b = 'c'
      resolve('done')
    },500)
  })
  const a = await task1()
  await console.log(`a:${a}`)
  await console.log(`b:${b}`)
}

getData()
