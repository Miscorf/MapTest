import request from '@/utils/request'

export function testUrl() {
  return request({
    url: '/1',
    method: 'get',
  })  
}
export function load_data_from_file() {
  return request({
    url: '/demo/load_data_from_file',
    method: 'get',
  })  
}
