<script setup lang="ts">
    import request_file from "@/components/request_files/index.vue";
    import request_editor from "@/components/request_editor/index.vue";
    import response_view from "@/components/response_view/index.vue";
    import config_bar from "@/components/config_bar/index.vue";
</script>

<template>
    
      <config_bar/>
      <request_file/>

        <div class="container" fluid>
          
          <request_editor/>
  
          <response_view/>
  
        </div>
  
</template>