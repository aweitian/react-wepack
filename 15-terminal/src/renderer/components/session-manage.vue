<template>
    <div class="session-mgr">
        <el-tabs v-model="selected_host" type="card" closable @tab-remove="removeTab">
          <el-tab-pane
            v-for="(item) in hosts"
            :key="item.id"
            :label="item.label"
            :name="item.id"
          >
            <session :connection="item" class="session"/>
          </el-tab-pane>
        </el-tabs>
    </div>
    <!---->
</template>


<script>
import session from "./session.vue"

export default {
  components: { session },
    // props:['connections'],
    data() {
      return {
        selected_host: '0',
        hosts: [],
        index:0
      }
    },
    methods: {
      addHost(connection) {
        //console.log('add connection.....')
        let t = Object.assign({},connection);
        t.id = ''+this.index;
        this.hosts.push(t);
        this.selected_host = t.id;
        this.index++
      },
      removeTab(targetName) {
        console.log(targetName,this.selected_host);
        let tabs = this.hosts;
          let activeName = this.selected_host;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              console.log(tab.id,targetName)
              if (tab.id === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.id;
                }
              }
            });
        }
        
        this.selected_host = activeName;
        let xhosts = tabs.filter(tab => tab.id !== targetName);
        this.hosts = xhosts;
        console.log(xhosts)
      }
    }
}
</script>


<style scoped>
.session-mgr{
  height: 100%;
}
</style>