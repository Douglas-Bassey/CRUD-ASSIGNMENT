const express = require(`express`);

const app = express();
const PORT = 3000;

app.use(express.json());

let hospitals = [
    {
        id: 1,
        name: "Mayo Clinic",
        location: "Rochester",
        country: "United States"
    },
    {
        id: 2,
        name: "Cleveland Clinic",
        location: "Cleveland",
        country: "United States"
    },
    {
        id: 3,
        name: "Toronto General Hospital",
        location: "Toronto",
        country: "Canada"
    },
    {
        id: 4,
        name: "Royal Melbourne Hospital",
        location: "Melbourne",
        country: "Australia"
    }
];

// GET
app.get(`/hospitals`, (req, res) => {
    res.status(200).json({
        success: true,
        message: `Hospitals retrieved successfully`,
        hospitals: hospitals,
    })

});

app.get(`/hospitals/:id`, (req, res) => {
    const hospital = hospitals.find(hospital => hospital.id === Number(req.params.id))

    res.status(200).json({
        success: true,
        message: `Single hospital retrieved successfully`,
        hospital: hospital,
    })
})


// POST
app.post(`/hospitals`, (req, res) => {
    const newHospital = req.body;
    hospitals.push (newHospital);
    
    res.status(200).json({
        success: true,
        message: `Hospital added successfully`,
        hospital: newHospital,
    })
})

// put
app.put(`/hospitals/:id`, (req, res) => {
    const hospital = hospitals.find(hospital => hospital.id === Number(req.params.id));

    hospital.name = req.body.name;
    hospital.location = req.body.location;
    hospital.country = req.body.country;
    res.status(200).json({
        success: true,
        message: `Hospital updated successfully`,
        hospital: hospital,
    });
})

// patch
app.patch(`/hospitals/:id`, (req, res) => {
    const hospital = hospitals.find(hospital => hospital.id === Number(req.params.id));
    if (req.body.name !== undefined) hospital.name = req.body.name;
    if (req.body.location !== undefined) hospital.location = req.body.location;
    if (req.body.country !== undefined) hospital.country = req.body.country;

    res.status(200).json({
        success: true,
        message: `Hospital updated successfully`,
        hospital: hospital,
    });
})

// delete
app.delete(`/hospitals/:id`, (req, res) => {
    const hospitalId = parseInt(req.params.id);
    const hospitalIndex = hospitals.findIndex(hospital => hospital.id === hospitalId);
    if (hospitalIndex !== -1) {
        hospitals.splice(hospitalIndex, 1);
        res.status(200).json({
            success: true,
            message: `Hospital deleted successfully`,
        });
    } else {
        res.status(404).json({
            success: false,
            message: `Hospital not found`,
        });
    }
});

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});