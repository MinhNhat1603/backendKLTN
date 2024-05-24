// tải dữ liệu JSON
var jsonInput = '[{"nodeId":1,"reputation":1134},{"nodeId":2,"reputation":547},{"nodeId":3,"reputation":1703},{"nodeId":4,"reputation":-199},{"nodeId":5,"reputation":-306},{"nodeId":6,"reputation":-49},{"nodeId":7,"reputation":1527},{"nodeId":8,"reputation":1223}]'

// tạo một đối tượng Workbook trống
var workbook = aspose.cells.Workbook()

// truy cập trang tính trống mặc định
var worksheet = workbook.getWorksheets().get(0)

// đặt kiểu
var factory = aspose.cells.CellsFactory()
style = factory.createStyle()
style.getFont().setBold(true) 
style.getFont().setColor(aspose.cells.Color.getBlueViolet())

// đặt JsonLayoutOptions để định dạng
var layoutOptions = aspose.cells.JsonLayoutOptions()
layoutOptions.setArrayAsTable(true)
layoutOptions.setTitleStyle(style)

// nhập dữ liệu JSON vào trang tính mặc định bắt đầu từ ô A1
aspose.cells.JsonUtility.importData(jsonInput, worksheet.getCells(), 0, 0, layoutOptions)

// lưu tệp kết quả 
workbook.save("output.xlsx", aspose.cells.SaveFormat.AUTO)
