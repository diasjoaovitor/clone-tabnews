import { webserver } from '@/infra/webserver'

export const APP_BASE_URL = webserver.origin

export const API_BASE_URL = `${webserver.origin}/api/v1`
