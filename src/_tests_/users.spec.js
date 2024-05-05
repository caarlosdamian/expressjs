import { getUserByIdHandler } from '../handlers/users.mjs';
import { users } from '../utils/constants.mjs';

const mockRequest = {
  userIndex: 1,
};

const mockResponse = {
  sendStatus: jest.fn(),
  send: jest.fn(),
};

describe('get users', () => {
  it('should get user by id', () => {
    getUserByIdHandler(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalled();
    expect(mockResponse.send).toHaveBeenCalledWith(users[1]);
    expect(mockResponse.send).toHaveBeenCalledTimes(1);
  });

  it('should not get user by id', () => {
    getUserByIdHandler({ ...mockRequest, userIndex: 100 }, mockResponse);
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(404);
    expect(mockResponse.send).not.toHaveBeenCalled();
  });
});
