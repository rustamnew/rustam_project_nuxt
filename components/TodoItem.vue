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

watch(props, (newProps) => {
    item.value = JSON.parse(JSON.stringify(newProps.itemProp))
    itemDefault.value = JSON.parse(JSON.stringify(newProps.itemProp))
    editMode.value = false
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
</script>

<template>
    <q-card v-if="editMode === false" class="p-4 m-2.5 w-full md:w-80 flex flex-col">
        <h5 class="text-xl mb-3">
            {{ item.title }}
        </h5>

        <div v-if="item.text" class="text-base sm:text-lg mb-2">
            {{ item.text }}
        </div>

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

/*.q-textarea.q-field--labeled:deep(.q-field__native) {
    //min-height: 3rem;
}*/
</style>
