const Mock = require('mockjs')

const List = []
const count = 30

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: '@ctitle(2,3)',
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/ambient/list',
    type: 'get',
    response: config => {
      let {name, page = 1, limit = 20, sort, search} = config.query
      console.log('config.query:', config.query)
      let mockList = List.filter(item => {
        if (name && item.name !== +name) return false

        return true
      })
      limit = limit == 'all' ? mockList.length : limit
      // if(limit==='all'){
      //   limit = mockList.length
      // }

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }

    }
  },

  {
    url: '/vue-element-admin/ambient/detail',
    type: 'get',
    response: config => {
      const {id} = config.query
      for (const ambient of List) {
        if (ambient.id === +id) {
          return {
            code: 20000,
            data: ambient
          }
        }
      }
    }
  },
  {
    url: '/vue-element-admin/ambient/delete',
    type: 'delete',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },


  {
    url: '/vue-element-admin/ambient/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/ambient/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

