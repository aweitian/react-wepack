<template>
    <div>
        <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
            <el-tab-pane
                :key="item.id"
                v-for="(item) in connections"
                :label="item.label"
                :name="item.id"
            >
                <session :connection="item"/>
            </el-tab-pane>
        </el-tabs>
        <session v-for="(k,v) in sessions" :key="v.id" :connection="v">

        </session>
    </div>
    
</template>


<script>
import session from "./session.vue"

export default {
  components: { session },
    props:['connections'],
    data() {
      return {
        editableTabsValue: '2',
        tabIndex: 1
      }
    },
    methods: {
      handleTabsEdit(targetName, action) {
        // if (action === 'add') {
        //   let newTabName = ++this.tabIndex + '';
        //   this.editableTabs.push({
        //     title: 'New Tab',
        //     name: newTabName,
        //     content: 'New Tab content'
        //   });
        //   this.editableTabsValue = newTabName;
        // }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      }
    }
}
</script>


Session