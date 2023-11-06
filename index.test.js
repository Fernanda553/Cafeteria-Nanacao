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
    const tokenTest = 'token'
    const idTest = '52985'

    const response = await request(app).delete(`/cafes/${idTest}`).set('authorization', tokenTest).send()

    expect(response.statusCode).toEqual(HTTP_STATUS.not_found.code)
    expect(response.body).toEqual({ message: 'No se encontró ningún cafe con ese id' })
  })
  test('[POST] /cafes | agrega un nuevo café y devuelve un código 201.', async () => {
    const idTest = 651982
    const cafe = { idTest, nombre: 'Capuchino vainilla' }
    const response = await request(app).post('/cafes').send(cafe)

    expect(response.statusCode).toEqual(HTTP_STATUS.created.code)
    expect(response.body).toEqual(expect.arrayContaining([cafe]))
  })
  test('[PUT] /cafes | devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.', async () => {
    const badId = 2894
    const cafe = { badId, nombre: 'Ice americano' }

    const response = await request(app).put(`/cafes/${badId}`).send(cafe)
    expect(response.statusCode).toEqual(HTTP_STATUS.bad_request.code)
  })
})
