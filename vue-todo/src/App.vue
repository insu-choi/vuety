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
                        :index="index"
                        :todoItem="todoItem"
                        @toggle="toggleTodoItem"
                        @remove="removeTodoItem"
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

export interface Todo {
    title: string;
    done: boolean;
}

export default Vue.extend({
    components: { TodoInput, TodoListItem },
    data() {
        return {
            todoText: '',
            todoItems: [] as Todo[],
        };
    },
    methods: {
        updateTodoText(value: string) {
            this.todoText = value;
        },
        addTodoItem() {
            const value = this.todoText;
            const todo: Todo = {
                title: value,
                done: false,
            };
            this.todoItems.push(todo);
            storage.save(this.todoItems);
            this.initTodoText();
        },
        initTodoText() {
            this.todoText = '';
        },
        fetchTodoItems() {
            this.todoItems = storage.fetch();
        },
        toggleTodoItem(todo: Todo, index: number) {
            this.todoItems.splice(index, 1, {
                ...todo,
                done: !todo.done,
            });
            storage.save(this.todoItems);
        },
        removeTodoItem(index: number) {
            this.todoItems.splice(index, 1);
            storage.save(this.todoItems);
        },
    },
    created() {
        this.fetchTodoItems();
    },
});
</script>

<style scoped></style>
