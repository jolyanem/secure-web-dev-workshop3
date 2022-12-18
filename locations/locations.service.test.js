const locationsService = require("./locations.service")
const Location = require("./locations.model")

jest.mock("./locations.model")

beforeEach(()=>{
    jest.resetAllMocks()
})


describe('Locations findOne', ()=> {
    it('Should get a location', async () => {
        const mockLocation = {
            _id: '1234567', filmName : 'Jojo la crevette'
        }
        Location.findById.mockResolvedValue(mockLocation);

        const location = await locationsService.findLocation(mockLocation._id);
        expect(location).toEqual(mockLocation)
        expect(Location.findById).toHaveBeenCalledTimes(1)
        expect(Location.findById).toHaveBeenCalledWith(mockLocation._id);
    });

    it('should throws an error if the location does not exist', async () => {
        jest.resetAllMocks()
        const mockLocation = {
            _id: '1234567', filmName : 'Jojo la crevette'
        }
        Location.findById.mockResolvedValue();

        try {
            await locationsService.findLocation(mockLocation._id);
        } catch (error) {
            expect(error.message).toBe('Location not found :(');
        }
    });
})

describe('Locations deleteOne', ()=>{
    it('should delete an existing location', async () => {
        const id = '123';
        Location.findOneAndDelete.mockResolvedValue("Valid");
        await locationsService.deleteOne(id);
        expect(Location.findOneAndDelete).toHaveBeenCalledWith({ _id: id });
    });

    it('should throws an error if the location does not exist', async () => {
        jest.resetAllMocks()
        const id = '123456';
        const deleteLocation = jest.fn().mockResolvedValue();
        Location.deleteOne = deleteLocation;
        try {
            await locationsService.deleteOne(id);
        } catch (error) {
            expect(error.message).toBe('Location not found');
        }
    });
})


//Test of updateLocation function, with a valid and an unknown location
describe('Locations updateLocation', ()=>{
    it('should update an existing location', async () => {
        const id = '123456';
        const update = { name: 'Great One', country: 'USA' };
        const location = {};
        const updateOne = jest.fn().mockResolvedValue("Valid");
        Location.updateOne = updateOne;

        await locationsService.updateLocation(id, update);
        expect(updateOne).toHaveBeenCalledWith({ _id: id }, update);
    });

    it('should throws an error if the location does not exist', async () => {
        jest.resetAllMocks()
        const id = '123456';
        const update = { name: 'Great One', country: 'USA' };
        const updateOne = jest.fn().mockResolvedValue(null);
        Location.updateOne = updateOne;
        try {
            await locationsService.updateLocation(id, update);
        } catch (error) {
            expect(error.message).toBe('Location not found');
        }
    });
})

describe('Location AddLocation', () =>{

    test('should saves a new location to the database', async () => {
        const data = { name: 'Great One', country: 'USA' };
        const save = jest.fn().mockResolvedValue();
        Location.mockImplementation(() => ({
            save
        }));

        await locationsService.addLocation(data);

        expect(Location).toHaveBeenCalledWith(data);
        expect(save).toHaveBeenCalled();
    });

    it('should throws an error if the data is invalid', async () => {
        jest.resetAllMocks()
        const data = {};
        const save = jest.fn().mockResolvedValue(new Error('Wrong data'));
        Location.mockImplementation(() => ({
            save
        }));
        try {
            await locationsService.addLocation(data);
        } catch (error) {
            expect(error.message).toBe('Wrong data');
        }
    });
})