<template>
  <XMask :menus="menus"></XMask>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { XMask, MenuDataItem } from '@vtj/ui';
  import { request } from '@vtj/utils';
  import { VtjIconComponents, VtjIconDatabase } from '@vtj/icons';
  const menus: any = await request({
    url: '/mock/menus.json'
  }).then((res) => res.data);

  // console.log(menus);

  // const menus: MenuDataItem[] = [
  //   {
  //     id: 'System',
  //     title: '系统管理',
  //     icon: VtjIconDatabase,
  //     children: [
  //       {
  //         id: 'System_1',
  //         title: '系统管理1',
  //         children: [
  //           {
  //             id: 'System_1_1',
  //             title: '系统管理2'
  //           },
  //           {
  //             id: 'System_1_2',
  //             title: '系统管理2'
  //           }
  //         ]
  //       },
  //       {
  //         id: 'System_2',
  //         title: '系统管理2'
  //       },
  //       {
  //         id: 'System_3',
  //         title: '系统管理3'
  //       }
  //     ]
  //   },
  //   {
  //     id: 'Right',
  //     title: '权限配置',
  //     icon: VtjIconDatabase
  //   },
  //   {
  //     id: 'Role',
  //     title: '用户角色',
  //     icon: VtjIconComponents
  //   }
  // ];
</script>
