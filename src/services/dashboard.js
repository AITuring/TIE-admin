import {TODAY} from '@/services/api'
import {request, METHOD} from '@/utils/request'

/**
 * 获取历史上的今天
 */

export function getToday() {
    return request(TODAY, METHOD.GET)
}