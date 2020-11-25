<template>
  <div style="display: flex">
    <task-group class="task-group todo" title="ToDo" group="task" :list="todoList">
      <task-item :key="index" v-for="(item, index) in todoList" :content="item" />
    </task-group>
    <task-group class="task-group doing" title="In Progress" group="task">
      <task-item :key="index" v-for="(item, index) in inproList" :content="item" />
    </task-group>
    <task-group class="task-group done" title="Done" group="task">
      <task-item :key="index" v-for="(item, index) in doneList" :content="item" />
    </task-group>
  </div>
</template>

<script>
import TaskGroup from '../../components/task/TaskGroup'
import TaskItem from '../../components/task/TaskItem'
const todoList = ['HTML', 'CSS', 'JavaScript', 'TypesSript', 'Vue', 'React']
const inproList = ['Nodejs', 'Express', 'Koa', 'Webpack', 'Vite', 'MongoDB']
const doneList = ['Python', 'Java', 'C++', 'Go', 'MySQL', 'Pytorch']
export default {
  name: 'TaskCard',
  components: {TaskItem, TaskGroup},
  data () {
    return {
      todoList,
      inproList,
      doneList
    }
  }
}
</script>

<style lang="less" scoped>
  .task-group{
    margin: 0 48px;
  }
  .todo {
    background-color: #f0f0f0;
  }
  .doing {
    background-color:#bfbfbf;
  }
  .done {
    background-color: #8c8c8c;
  }
  .dragable-ghost{
    border: 1px dashed red;
    opacity: 1;
  }
  .dragable-chose{
    border: 1px dashed red;
    opacity: 0.8;
  }
  .dragable-drag{
    border: 1px dashed red;
    opacity: 1;
  }
</style>
