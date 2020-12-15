const Mock = require('mockjs')

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    ip: '@ip',
    port: '22',
    connective: '@integer(0,2)',
    hostname: '@ctitle(2,3)',
    state: '@integer(0,2)',
    hardware: 'CPU: @integer(2,8)| MEM: @integer(2,32)G| DISK: @integer(100,2000)G',

    // content_short: 'mock data',
    // content: baseContent,
    // forecast: '@float(0, 100, 2, 2)',
    // importance: '@integer(1, 3)',
    // 'type|1': ['CN', 'US', 'JP', 'EU'],
    // 'status|1': ['published', 'draft'],
    create_time: '@datetime',
    // comment_disabled: true,
    // pageviews: '@integer(300, 5000)',
    // image_uri,
    // platforms: ['a-platform']
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/assets/list',
    type: 'get',
    response: config => {
      const {importance, type, ip, hostname, page = 1, limit = 20, sort,search} = config.query
      console.log('query:',config.query)
      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (ip && item.ip !== ip) return  false
        if (search && item.ip.indexOf(search) < 0) return false
        if (hostname && item.hostname !== ip) return  false
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
    url: '/vue-element-admin/assets/detail',
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
    url: '/vue-element-admin/assets/delete',
    type: 'delete',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },


  {
    url: '/vue-element-admin/assets/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/assets/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

