<template>
  <CFooter :fixed="false">
    <div>
      <a href="https://coreui.io" target="_blank">Sharec</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} creativeLabs.</span>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
