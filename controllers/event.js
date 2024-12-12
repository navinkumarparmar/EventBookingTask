const Event = require('../models/event');

module.exports.createEvent = async function(req,res,next){

    try {
                const { name, date, capacity } = req.body;
                const event = new Event({
                    name,
                    date,
                    capacity,
                    availableSeats: capacity,
                });
        
                await event.save();
        
                return res.status(201).json({
                    success: true,
                    message: 'Event created successfully',
                    data: event,
                });
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: 'Error creating event',
                    error: error.message,
                });
            }
        };






module.exports.getEvents = async function (req, res, next) {
    try {
        const { start, end, page = 1, limit = 10 } = req.query;
        const filter = {};

        
        if (start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);

            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid date format. Please provide valid start and end dates.',
                });
            }

            filter.date = { $gte: startDate, $lte: endDate };
        }

       
        const pageNumber = parseInt(page);
        const pageSize = parseInt(limit);

        if (pageNumber <= 0 || pageSize <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Pagination values should be greater than 0.',
            });
        }

        const events = await Event.find(filter)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);

        return res.status(200).json({
            success: true,
            data: events,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching events',
            error: error.message,
        });
    }
};


module.exports.updateEvent = async function (req, res,next) {
    try {
        const { id } = req.params;
        const { name, date, capacity } = req.body;

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found',
            });
        }

        event.name = name || event.name;
        event.date = date || event.date;
        event.capacity = capacity || event.capacity;
        event.availableSeats = capacity || event.availableSeats;

        await event.save();

        return res.status(200).json({
            success: true,
            message: 'Event updated successfully',
            data: event,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error updating event',
            error: error.message,
        });
    }
};


module.exports.deleteEvent = async function (req, res,next)  {
    try {
        const { id } = req.params;

        const event = await Event.findByIdAndDelete(id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Event deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error deleting event',
            error: error.message,
        });
    }
};







module.exports.getEvents = async function (req, res, next) {
    try {
        const { start, end, page = 1, limit = 10 } = req.query;
        const filter = {};

        if (start && end) {
            filter.date = { $gte: new Date(start), $lte: new Date(end) };
        }

        const events = await Event.find(filter)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        return res.status(200).json({
            success: true,
            data: events,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching events',
            error: error.message,
        });
    }
};



