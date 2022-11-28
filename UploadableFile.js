class UploadableFile {
    constructor(file) {

        this.file = file
        this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`
        this.name = file.name
        this.url = URL.createObjectURL(file)
        this.status = null
        this.percentage = 0
        this.type = file.type
    }
}
export default UploadableFile