const express = require(`express`);

const app = express();
const PORT = 3000;

app.use(express.json());

let trees = [
    {
        id: 1,
        name: "Mango Tree",
        fruitType: "Mango",
        color: "Orange"
    },
    {
        id: 2,
        name: "Apple Tree",
        fruitType: "Apple",
        color: "Red"
    },
    {
        id: 3,
        name: "Orange Tree",
        fruitType: "Orange",
        color: "Orange"
    },
    {
        id: 4,
        name: "Coconut Palm",
        fruitType: "Coconut",
        color: "Green"
    }
];

// GET
app.get(`/trees`, (req, res) => {
    res.status(200).json({
        success: true,
        message: `Trees retrieved successfully`,
        trees: trees,
    });
});

app.get(`/trees/:id`, (req, res) => {
    const tree = trees.find(tree => tree.id === Number(req.params.id));

    if (!tree) {
        return res.status(404).json({
            success: false,
            message: `Tree not found`,
        });
    }
    res.status(200).json({
        success: true,
        message: `Tree retrieved successfully`,
        tree: tree,
    });
});

// POST
app.post(`/trees`, (req, res) => {
    const newTree = req.body;
    trees.push(newTree);

    res.status(201).json({
        success: true,
        message: `Tree added successfully`,
        tree: newTree,
    });
});

// put
app.put(`/trees/:id`, (req, res) => {
    const tree = trees.find(tree => tree.id === Number(req.params.id));

    if (!tree) {
        return res.status(404).json({
            success: false,
            message: `Tree not found`,
        });
    }

    tree.name = req.body.name;
    tree.fruitType = req.body.fruitType;
    tree.color = req.body.color;
    res.status(200).json({
        success: true,
        message: `Tree updated successfully`,
        tree: tree,
    });
});

// patch
app.patch(`/trees/:id`, (req, res) => {
    const tree = trees.find(tree => tree.id === Number(req.params.id));

    if (!tree) {
        return res.status(404).json({
            success: false,
            message: `Tree not found`,
        });
    }

    if (req.body.name !== undefined) tree.name = req.body.name;
    if (req.body.fruitType !== undefined) tree.fruitType = req.body.fruitType;
    if (req.body.color !== undefined) tree.color = req.body.color;
    res.status(200).json({
        success: true,
        message: `Tree updated successfully`,
        tree: tree,
    });
});

// delete
app.delete(`/trees/:id`, (req, res) => {
    const treeIndex = trees.findIndex(tree => tree.id === Number(req.params.id));
    if (treeIndex !== -1) {
        trees.splice(treeIndex, 1);
        res.status(200).json({
            success: true,
            message: `Tree deleted successfully`,
        });
    } else {
        res.status(404).json({
            success: false,
            message: `Tree not found`,
        });
    }
});

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});