<template>
    <div>
        <header>
            <h1>Vue Todo with Typescript</h1>
        </header>
        <main>
            <TodoInput :item="todoText" @input="updateTodoText" @add="addTodoItem"></TodoInput>
            <div>
                <ul>
                    <TodoListItem
                        v-for="(todoItem, index) in todoItems"
                        :key="index"
                        :todoItem="todoItem"
                    ></TodoListItem>
                </ul>
            </div>
        </main>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TodoInput from './components/TodoInput.vue';
import TodoListItem from './components/TodoListItem.vue';

const STORE_KEY = 'todo-item-v1';
const storage = {
    save(todoItems: any[]) {
        const parsed = JSON.stringify(todoItems);
        localStorage.setItem(STORE_KEY, parsed);
    },
    fetch() {
        const storeItems = localStorage.getItem(STORE_KEY) || '[]';
        const todoItems = JSON.parse(storeItems);
        return todoItems;
    },
};

export default Vue.extend({
    components: { TodoInput, TodoListItem },
    data() {
        return {
            todoText: '',
            todoItems: [] as any[],
        };
    },
    methods: {
        updateTodoText(value: string) {
            this.todoText = value;
        },
        addTodoItem() {
            const value = this.todoText;
            this.todoItems.push(value);
            storage.save(this.todoItems);
            this.initTodoText();
        },
        initTodoText() {
            this.todoText = '';
        },
        fetchTodoItems() {
            this.todoItems = storage.fetch();
        },
    },
    created() {
        this.fetchTodoItems();
    },
});
</script>

<style scoped></style>
