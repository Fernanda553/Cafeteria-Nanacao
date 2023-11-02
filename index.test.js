import { describe, expect, test } from 'vitest'
import app from './index'
import request from 'supertest'
import HTTP_STATUS from './config/constans.js'

describe('Operaciones CRUD de cafes', () => {
  test('[GET] /cafes | debe devolver un status code 200 y el tipo de dato recibido es un arreglo.', async () => {
    const response = await request(app).get('/cafes').send()

    expect(response.statusCode).toEqual(HTTP_STATUS.ok.code)
    expect(response.body).toBeInstanceOf(Array)
  })
  test('[GET] /cafes/:id | debe devolver un status code 404 al inter eliminar un café que no existe.', async () => {
    const response = await request(app).get('/cafes/:id').send()

    expect(response.statusCode).toEqual(HTTP_STATUS.not_found.code)
    expect(response.body).toEqual({ message: 'No se encontró ningún cafe con ese id' })
  })
  test('[POST] /cafes | agrega un nuevo café y devuelve un código 201.', async () => {
    const response = await request(app).get('/cafes').send()

    expect(response.statusCode).toEqual(HTTP_STATUS.ok.code)
    expect(response.body).toBeInstanceOf(Array)
  })
})
