const { getMockReq, getMockRes } = require("@jest-mock/express")
const PersonController = require("../persons")
const models = require('../../models')
const { Person } = models
const mockData = require('./mockData.json')

describe('persons controllers', () => {
  it('should return all persons', async () => {
    // Arrange: Mock req, res
    const req = getMockReq()
    const { res } = getMockRes()
    // Arrange: Mock calls to database
    jest.spyOn(Person, 'findAll').mockResolvedValue(mockData.persons)
    // ACT
    await PersonController.getAllPersons(req, res)
    // Assert
    expect(res.send).toHaveBeenCalledWith({ persons: mockData.persons })
  })

  it('should return one person', () => {
    console.log('hello')
  })
})