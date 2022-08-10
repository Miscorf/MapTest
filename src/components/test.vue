<template>
  <div></div>
</template>

<script>
import PointMap from "../components/jsObject/Point";
export default {
  created() {
    var pointMap = new PointMap("padsa", "urlp");
    console.log(pointMap.getName());
  },
};
</script>
