const { getMockReq, getMockRes } = require("@jest-mock/express")
const PersonController = require("../persons")
const models = require('../../models')
const { Person } = models
const mockData = require('./mockData.json')

describe('persons controllers', () => {
  afterEach(() => {
    jest.restoreAllMocks()
    getMockRes().mockClear()
  })

  it('getAllPersons: should return all persons', async () => {
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

  it('getPersonById: should return one person', async () => {
    // Arrange: Mock req, res
    const req = getMockReq({ params: { personId: 1 } })
    const { res } = getMockRes()
    // Arrange: Mock calls to database
    jest.spyOn(Person, 'findByPk').mockResolvedValue(mockData.persons[0])
    // ACT
    await PersonController.getPersonById(req, res)
    // Assert
    expect(res.send).toHaveBeenCalledWith({ persons: [mockData.persons[0]] })
  })

  it('getPersonById: should error if no person is found', async () => {
    // Arrange: Mock req, res
    const req = getMockReq({ params: { personId: 333 } })
    const { res } = getMockRes()
    // Arrange: Mock calls to database
    jest.spyOn(Person, 'findByPk').mockResolvedValue(null)
    // ACT
    await PersonController.getPersonById(req, res)
    // Assert
    expect(res.send).toHaveBeenCalledWith({ error: 'User 333 not found' })
    expect(res.status).toHaveBeenCalledWith(400)
  })

  it('addPerson: should add new person', async () => {
    // Arrange: Mock req, res
    // Make sure to submit valid request — has name, address
    const req = getMockReq({ params: { personId: 1 }, body: { name: 'Jane', address: '22 Pedro Gil' } })
    const { res } = getMockRes()
    // Arrange: Mock calls to database
    jest.spyOn(Person, 'create').mockResolvedValue(mockData.persons[0])
    // ACT
    await PersonController.addPerson(req, res)
    // Assert
    expect(res.send).toHaveBeenCalledWith({ persons: [mockData.persons[0]] })
  })

  it('addPerson: should error if req is invalid', async () => {
    // Arrange: Mock req, res
    // body is invalid because it lacks address
    const req = getMockReq({ body: { name: 'Jane' } })
    const { res } = getMockRes()
    // Arrange: Mock calls to database
    // findByPk will work
    jest.spyOn(Person, 'findByPk').mockResolvedValue(mockData.persons[0])
    // ACT
    await PersonController.addPerson(req, res)
    // Assert — should fail because validation failed
    expect(res.json).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(400)
  })

  it('updatePerson: should update person', async () => {
    // Arrange: Mock req, res
    // body is invalid because it lacks address
    const req = getMockReq({ params: { personId: 1 }, body: { name: 'Jane' } })
    const { res } = getMockRes()
    // Arrange: Mock calls to database
    // findByPk will work
    jest.spyOn(Person, 'findByPk').mockResolvedValue(mockData.persons[0])
    jest.spyOn(Person, 'update').mockResolvedValue(mockData.persons[0])
    // ACT
    await PersonController.updatePerson(req, res)
    // Assert
    expect(res.send).toHaveBeenCalledWith({ persons: [mockData.persons[0]] })
  })

  it('updatePerson: should error if person does not exist', async () => {
    // Arrange: Mock req, res
    // body is invalid because it lacks address
    const req = getMockReq({ params: { personId: 333 }, body: { name: 'Jane' } })
    const { res } = getMockRes()
    // Arrange: Mock calls to database
    // findByPk should return null (person not in database)
    jest.spyOn(Person, 'findByPk').mockResolvedValue(null)
    jest.spyOn(Person, 'update').mockResolvedValue(mockData.persons[0])
    // ACT
    await PersonController.updatePerson(req, res)
    // Assert
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({ error: 'User 333 not found' })
  })

  it('updatePerson: should error if req is invalid', async () => {
    // Arrange: Mock req, res
    // body is invalid because it lacks address
    const req = getMockReq({ params: { personId: 1 }, body: { notAValidKey: 'Jane' } })
    const { res } = getMockRes()
    // Arrange: Mock calls to database
    jest.spyOn(Person, 'findByPk').mockResolvedValue(mockData.persons[0])
    jest.spyOn(Person, 'update').mockResolvedValue(mockData.persons[0])
    // ACT
    await PersonController.updatePerson(req, res)
    // Assert
    expect(res.json).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(400)
  })

  it('deletePerson: should delete person', async () => {
    // Arrange: Mock req, res
    // body is invalid because it lacks address
    const req = getMockReq({ params: { personId: 1 } })
    const { res } = getMockRes()
    // Arrange: Mock calls to database
    jest.spyOn(Person, 'findByPk').mockResolvedValue(mockData.persons[0])
    jest.spyOn(Person, 'destroy').mockResolvedValue(null)
    // ACT
    await PersonController.deletePerson(req, res)
    // Assert
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({ message: `User 1 successfully deleted` })
  })

  it('deletePerson: should error if person does not exist', async () => {
    // Arrange: Mock req, res
    // body is invalid because it lacks address
    const req = getMockReq({ params: { personId: 333 } })
    const { res } = getMockRes()
    // Arrange: Mock calls to database
    jest.spyOn(Person, 'findByPk').mockResolvedValue(null)
    jest.spyOn(Person, 'destroy').mockResolvedValue(mockData.persons[0])
    // ACT
    await PersonController.deletePerson(req, res)
    // Assert
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({ error: `User 333 not found` })
  })
})