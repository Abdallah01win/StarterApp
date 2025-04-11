import { z } from 'zod'

import customErrorMap from './errorMap'

z.setErrorMap(customErrorMap)

export default z
