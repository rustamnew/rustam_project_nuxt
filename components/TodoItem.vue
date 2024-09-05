<script setup>
import IconCross from './icons/IconCross.vue'

const props = defineProps({
    itemProp: Object,
    index: Number,
})

const emit = defineEmits(['save', 'remove'])

const item = ref(JSON.parse(JSON.stringify(props.itemProp)))
const itemDefault = ref(JSON.parse(JSON.stringify(props.itemProp)))
const editMode = ref(item.value.id === -1) // item.id === -1 ? true : false
const confirmRemove = ref(false)

const error = ref({
    message: '',
    showError: false,
})

function allEmptyCheck() {
    const allEmpty = !item.value.title && !item.value.text && !item.value.steps.length
    return allEmpty
}

function addStep() {
    if (!item.value.steps)
        item.value.steps = []

    item.value.steps.push({
        title: '',
        checked: false,
    })
}

function removeStep(index) {
    item.value.steps.splice(index, 1)
}

function editItem() {
    itemDefault.value = JSON.parse(JSON.stringify(item.value))
    editMode.value = true
}

function saveItem() {
    if (!allEmptyCheck()) {
        itemDefault.value = item.value
        editMode.value = false
        emit('save', item.value)
    }
    else {
        // error.value.message = 'Нельзя сохранить пустую задачу'
        // error.value.showError = true
    }
}
function cancelEdit() {
    if (!itemDefault.value.title && !itemDefault.value.text && !itemDefault.value.steps.length) {
        removeItem()
    }
    else {
        item.value = itemDefault.value
        editMode.value = false
    }
}
function confirmRemoveItem() {
    confirmRemove.value = true
}
function removeItem() {
    emit('remove')
}

// Поиск и замена ссылок в тексте на <a href=..></a>
function findLinks(string) {
    console.log(string)
    const res = [...string.matchAll(/https?:\/\/[^\s]*/g)]

    if (!res.length)
        return string

    let newString = string

    res.forEach((item) => {
        const text = item[0]
        // const textLength = text.length
        // const indexTextStart = item.index
        // const indexTextEnd = indexTextStart + textLength
        const linkElement = `<a href="${text}" target="_blank">${text}</a>`

        newString = newString.replace(text, linkElement)
    })

    return newString
}

// Отслеживание обновления пропсов
watch(props, (newProps) => {
    item.value = JSON.parse(JSON.stringify(newProps.itemProp))
    itemDefault.value = JSON.parse(JSON.stringify(newProps.itemProp))
    editMode.value = false
})

const itemSizeLabel = computed(() => {
    let label = ''

    switch (item.value.size) {
        case 2:
            label = 'Большой'
            break
        case 1:
            label = 'Средний'
            break
        case 0:
            label = 'Малый'
            break
        default:
            label = 'Малый'
            break
    }

    return label
})

const highlightedLinks = computed(() => {
    let string = item.value.text
    if (!string)
        return ''

    const res = [...item.value.text.matchAll(/https?:\/\/[^\s]*/g)]
    if (!res.length)
        return string

    res.forEach((item) => {
        const text = item[0]
        // const textLength = text.length
        // const indexTextStart = item.index
        // const indexTextEnd = indexTextStart + textLength
        const linkElement = `<a href="${text}" target="_blank">${text}</a>`

        string = string.replace(text, linkElement)
    })

    return string
})

// item.value.text = findLinks(item.value.text)
</script>

<template>
    <q-card
        v-if="true/*editMode === false*/" class="
        card p-4 m-2.5 flex flex-col overflow-hidden
        !h-[unset] min-h-[90px]
        min-w-[240px] w-full" :class="item.size === 2 ? 'md:max-w-full' : item.size === 1 ? 'md:max-w-[47%]' : 'md:max-w-80'"
    >
        <h5 class="text-xl mb-3">
            {{ item.title }}
        </h5>

        <p v-if="item.text" class="text-lg break-words md:break-normal whitespace-pre-wrap mb-2 w-full w-[90%]" v-html="highlightedLinks" />

        <div class="flex flex-col mb-5">
            <q-checkbox
                v-for="step, stepIndex in item.steps"
                :key="stepIndex"
                v-model="step.checked"
                :label="step.title"
                class="q-custom-checkbox"
                @update:model-value="saveItem()"
            />
        </div>

        <q-btn color="primary" class="mt-auto" text-color="white" label="Редактировать" @click="editItem()" />
    </q-card>

    <q-dialog v-model="editMode">
        <q-card>
            <!-- :class="item.size === 2 ? 'w-full md:!max-w-full' : item.size === 1 ? 'md:!max-w-[47%]' : 'md:!max-w-80'" -->
            <q-card-section>
                <q-input v-model="item.title" label="Заголовок" autofocus />
                <q-input v-model="item.text" type="textarea" autogrow label="Описание" />
            </q-card-section>

            <q-card-section>
                <div class="flex flex-col items-start w-full">
                    <div v-for="step, stepIndex in item.steps" :key="stepIndex" class="flex flex-nowrap items-center w-full">
                        <q-checkbox
                            v-model="step.checked"
                            class="q-custom-checkbox"
                        />

                        <q-input v-model="step.title" placeholder="Пункт" class="w-full" />

                        <button class="remove" @click="removeStep(stepIndex)">
                            <IconCross color="red" size="1.5rem" />
                        </button>
                    </div>
                </div>
            </q-card-section>

            <q-card-section class="flex flex-col justify-center items-center overflow-hidden">
                <q-badge>
                    Размер окна
                </q-badge>

                <q-slider
                    v-model="item.size"
                    :min="0"
                    :max="2"
                    :step="1"
                    snap
                    label
                    :label-value="itemSizeLabel"
                    class="w-[90%] mx-auto"
                />
            </q-card-section>

            <q-card-section>
                <div class="flex items-center justify-end mt-3">
                    <q-btn class="bg-darkgreen m-1" size="sm" text-color="white" label="Добавить этап" @click="addStep()" />

                    <q-btn class="bg-darkgray m-1" size="sm" text-color="white" label="Удалить" @click="confirmRemoveItem()" />
                    <q-btn class="bg-red m-1" size="sm" text-color="white" label="Отмена" @click="cancelEdit()" />
                    <q-btn class="bg-green m-1" size="sm" text-color="white" label="Сохранить" @click="saveItem(true)" />
                </div>
            </q-card-section>
        </q-card>
    </q-dialog>

    <q-dialog v-model="confirmRemove">
        <q-card>
            <q-card-section>
                <div class="text-h6">
                    Удалить задачу
                </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                Отменить это действие будет невозможно
            </q-card-section>

            <q-card-actions align="right">
                <q-btn v-close-popup flat label="OK" color="primary" @click="removeItem()" />
            </q-card-actions>
        </q-card>
    </q-dialog>

    <q-dialog v-model="error.showError">
        <q-card>
            <q-card-section>
                <div class="text-h6">
                    Ошибка
                </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                {{ error.message }}
            </q-card-section>

            <q-card-actions align="right">
                <q-btn v-close-popup flat label="OK" color="primary" @click="error.showError = false" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<style scoped lang="scss">
.q-checkbox[aria-checked="true"]:deep(.q-checkbox__label) {
    text-decoration: line-through;
    opacity: 0.6;
    user-select: none;
}

.q-card:deep(p > a) {
    @apply text-blue
}
.q-card:deep(p > a:hover) {
    @apply underline
}

/*.q-textarea.q-field--labeled:deep(.q-field__native) {
    //min-height: 3rem;
}*/
</style>
