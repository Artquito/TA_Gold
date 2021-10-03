<template>
    <div>
        <a-row justify="end" style="margin:10px 0px">
            <a-button type="primary">
                Tambah Pelanggan
            </a-button>
        </a-row>
        <a-table :columns="columns" :dataSource="data">

        </a-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: [
                {
                    key:"1",
                    name:"Art",
                    id:"1",
                }
            ],
            columns:[
                {
                    title: "ID",
                    dataIndex:"id",
                    Key: "id",
                },
                {
                    title: "Name",
                    dataIndex: "name",
                    Key:"name",
                },
            ]
        }
    },
    
}
</script>