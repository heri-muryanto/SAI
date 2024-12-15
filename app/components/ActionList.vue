<template>
  <GridLayout rows="auto" columns="*,*" class="action-list">
    <Button
      v-for="action in actions"
      :key="action.id"
      :text="action.label"
      class="btn-primary"
      @tap="$emit('actionSelected', action.id)"
    />
  </GridLayout>
</template>

<script lang="ts">
export default {
  name: 'ActionList',
  props: {
    actions: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.action-list {
  margin: 16;
  gap: 8;
}
</style>