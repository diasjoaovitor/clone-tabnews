import { webserver } from '@/infra'

export const APP_BASE_URL = webserver.origin

export const API_BASE_URL = `${webserver.origin}/api/v1`
