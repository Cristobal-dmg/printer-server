// Change this:
app.listen(3000, ...)

// To this:
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));