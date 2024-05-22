export const getAllItem = async () => {
  const res: any = await window.api.sql(
    `select * from contents ORDER BY created_at DESC`,
    'findAll'
  )
  return res
}
