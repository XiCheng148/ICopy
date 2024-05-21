export const getAllItem = async () => {
  const res: any = await window.api.sql(`select * from contents`, 'findAll')
  return res
}
