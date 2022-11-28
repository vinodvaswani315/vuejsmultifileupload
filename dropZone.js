export default {
    name: "dropZone",
    template: `
    <div :data-active="active" @dragenter.prevent="setActive" @dragover.prevent="setActive" @dragleave.prevent="setInactive" @drop.prevent="onDrop">
		<slot :dropZoneActive="active"></slot>
	</div>
    `,
    emits: ['files-dropped'],
    data() {
        return {
            active:false,
            events: ['dragenter', 'dragover', 'dragleave', 'drop']
        }
    },
    mounted()
    {
        this.events.forEach((eventName) => {
            document.body.addEventListener(eventName, this.preventDefaults)
        })
    },
    unmounted()
    {
        this.events.forEach((eventName) => {
            document.body.removeEventListener(eventName, this.preventDefaults)
        })
    },
    methods:
    {
        setInactive() {
            this.active = false
        },
        setActive() {
            this.active = true
        },
        onDrop(e) {
            this.setInactive()
            this.$emit('files-dropped', [...e.dataTransfer.files])
        },
        preventDefaults(e) {
            e.preventDefault()
        }
    }
}