export const getAllItem = async () => {
  const res: any = await window.api.sql(`select * from contents`, 'findAll')
  console.log('res: ', res)
  return res
}
