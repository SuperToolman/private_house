<script setup>
</script>

<template>
  <PhViewLayout
      :title="'Swagger接口信息'"
      :sub-title="'查看应用程序接口'">

    <ph-card>
      <div class="container-wrap">
        <div class="container">
          <div class="left">
            <iframe
                id="child"
                src="https://localhost:7122/swagger/index.html"
                style="width: 100%; height: 100%"
            ></iframe>
          </div>

          <div class="right">
            <iframe
                id="child"
                src="https://localhost:7191/swagger/index.html"
                style="width: 100%; height: 100%"
            ></iframe>
          </div>
        </div>
      </div>
    </ph-card>

  </PhViewLayout>
</template>

<style scoped>
.container-wrap{
  width: 100%;
  //min-height: 100vw;;
}
.container{
  width: 100%;
  height: 780px;
  display: flex;
}
.container .left, .right{
  flex-grow: 1;
}
</style>