const Mock = require('mockjs')

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: '@ctitle(2,4)',
    asset_count: '@integer(1,3)',
    comment: baseContent,
    create_time: '@datetime',
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/idc/list',
    type: 'get',
    response: config => {
      const { name, page = 1, limit = 20, sort,search} = config.query
      console.log('query:',config.query)
      let mockList = List.filter(item => {
        if (search && item.name.indexOf(search) < 0) return false
        if (name && item.name !== name) return  false
        return true
      })

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
    url: '/vue-element-admin/idc/detail',
    type: 'get',
    response: config => {
      const {id} = config.query
      for (const assets of List) {
        if (assets.id === +id) {
          return {
            code: 20000,
            data: assets
          }
        }
      }
    }
  },
  {
    url: '/vue-element-admin/idc/delete',
    type: 'delete',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },


  {
    url: '/vue-element-admin/idc/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/idc/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

