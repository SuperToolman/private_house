<script setup>
const props = defineProps({
  mangaId:{type:String,default:''}
})
</script>

<template>
  <PhCard :title="'评论'">
    测试
    {{mangaId}}

    <a-comment>
      <template #actions>
        <span key="comment-nested-reply-to">回复</span>
      </template>
      <template #author>
        <a>Han Solo</a>
      </template>
      <template #avatar>
        <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      </template>
      <template #content>
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure).
        </p>
      </template>
      <a-comment>
        <template #actions>
          <span>Reply to</span>
        </template>
        <template #author>
          <a>Han Solo</a>
        </template>
        <template #avatar>
          <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        </template>
        <template #content>
          <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure).
          </p>
        </template>
        <a-comment>
          <template #actions>
            <span>Reply to</span>
          </template>
          <template #author>
            <a>Han Solo</a>
          </template>
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
          </template>
          <template #content>
            <p>
              We supply a series of design principles, practical patterns and high quality design
              resources (Sketch and Axure).
            </p>
          </template>
        </a-comment>
        <a-comment>
          <template #actions>
            <span>Reply to</span>
          </template>
          <template #author>
            <a>Han Solo</a>
          </template>
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
          </template>
          <template #content>
            <p>
              We supply a series of design principles, practical patterns and high quality design
              resources (Sketch and Axure).
            </p>
          </template>
        </a-comment>
      </a-comment>
    </a-comment>
  </PhCard>
</template>

<style scoped>

</style>