		 
		 
<%@page import="com.itextpdf.text.log.SysoLogger"%>
<%@page import="com.smt.bean.NumToWord"%>
<%@page import="java.text.DecimalFormat"%>
<%@page import="com.itextpdf.text.Rectangle"%>
<%@page import="com.itextpdf.text.pdf.PdfEncodings"%>
<%@page import="com.itextpdf.text.pdf.BaseFont"%>
<%@page import="com.itextpdf.text.BaseColor"%>
<%@page import="com.itextpdf.text.Font"%>
<%@page import="com.itextpdf.text.FontFactory"%>
<%@page import="java.util.Formatter"%>
<%@page import="javax.sound.midi.Soundbank"%>
<%@page import="com.itextpdf.text.pdf.codec.Base64.OutputStream"%>
<%@page import="java.util.Date"%>
<%@page import="java.io.IOException"%>
<%@page import="com.itextpdf.text.DocumentException"%>
<%@page import="com.itextpdf.text.Paragraph"%>
<%@page import="com.itextpdf.text.pdf.PdfWriter"%>
<%@page import="com.itextpdf.text.Document"%>



<%@ page trimDirectiveWhitespaces="true"%>

<%@page import="java.util.Date"%>
<%@page import="java.io.IOException"%>
<%@page import="com.itextpdf.text.DocumentException"%>
<%@page import="com.itextpdf.text.Paragraph"%>
<%@page import="com.itextpdf.text.pdf.PdfWriter"%>
<%@page import="com.itextpdf.text.Document"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>

<%@page import="java.awt.Desktop"%>
<%@page import="java.io.File"%>
<%@page import="com.itextpdf.text.pdf.PdfPCell"%>
<%@page import="com.itextpdf.text.pdf.PdfPTable"%>
<%@page import="com.itextpdf.text.Paragraph"%>
<%@page import="java.io.FileOutputStream"%>
<%@page import="com.itextpdf.text.PageSize"%>
<%@page import="com.itextpdf.text.pdf.PdfWriter"%>
<%@page import="java.util.List"%>

<%@ page import="com.itextpdf.text.Element"%>
<%--  <%@page import="com.itextpdf.text.log.SysoLogger"%> --%>
<%@page import="java.util.List"%>

<%@page import="java.util.TimeZone"%>
<%@page import="java.text.SimpleDateFormat"%>

<%@page import="com.itextpdf.text.Phrase"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.util.Date"%>
<%@page import="com.itextpdf.text.Image"%>
<%@page import="com.itextpdf.text.pdf.PdfContentByte"%>
<%@page import="com.itextpdf.text.Image"%>
<%@page import="com.itextpdf.text.pdf.PdfContentByte"%>
<%@page import="com.itextpdf.text.pdf.PdfGState"%>



<%@page import="javax.activation.DataSource"%>
<%@page import="javax.mail.util.ByteArrayDataSource"%>
<%@page import="javax.activation.DataHandler"%>
<%@page import="javax.activation.FileDataSource"%>
<%@page import="javax.mail.Multipart"%>
<%@page import="javax.mail.internet.MimeMultipart"%>
<%@page import="javax.mail.internet.MimeBodyPart"%>
<%@page import="javax.mail.Address"%>
<%@page import="com.sun.mail.smtp.SMTPTransport"%>
<%@page import="javax.mail.URLName"%>
<%@page import="javax.mail.internet.InternetAddress"%>
<%@page import="javax.mail.internet.MimeMessage"%>
<%@page import="javax.mail.Transport"%>
<%@page import="javax.mail.Session"%>


<%@ page import="java.io.*, com.itextpdf.text.*, com.itextpdf.text.pdf.*" %>


<%
response.setContentType("application/pdf");
Long billno = (Long) session.getAttribute("carBillNO");

	
	int itemCount = 0;
	int quantCount = 0;
	double finalTotAmountWithoutDis = 0;
	double finalTotAmountWithDis = 0;
	double finalDiscountAmt = 0;
	double finalgross = 0;
	double finalDis = 0;
	double laberCharges = 0;
	double finalLaberCharges = 0;
	double subtotal=0;
	double totalperitem=0;
	double service_totalGrid=0;
	double subtotal1=0;
	double subtotalOil1=0;
	double disc=0;
	String description="";
	
	DecimalFormat df = new DecimalFormat("#.00");

	Connection conn = null;

	try {
		// step 1
		Document document = new Document(PageSize.A4);
		
		// step 2
		
		PdfWriter.getInstance(document, response.getOutputStream());
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
	    PdfWriter.getInstance(document, baos);
	    
	 // step 3
		document.open();

		Class.forName("com.mysql.jdbc.Driver");
		conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/smt_sc", "root", "root");
		Statement stmt = conn.createStatement();

		
		Statement stmt2 = conn.createStatement();
		ResultSet rs2 = stmt2.executeQuery("select service_item,service_hsn,service_quantity,service_saleprice,service_disc_grid,service_discAmt,service_gst,service_igst,service_totalGrid,service_totalAmt,service_taxAmt from service_billing  where BillNo =" + billno);
		
		
		
		Statement stmt1 = conn.createStatement();
		//ResultSet rs1 = stmt1.executeQuery("SELECT  ItemName,HsnSacNo,Quantity,SalePrice,totalperitem,discountGrid,discountAmt,Gst,Igst,wholeTotal from barreloilbilling where BillNo ="+billno+"  UNION select service_item,service_hsn,service_quantity,service_saleprice,service_disc_grid,service_discAmt,service_gst,service_igst,service_totalGrid,service_totalAmt from service_billing where BillNo =" + billno);
		ResultSet rs1 = stmt1.executeQuery("SELECT  ItemName,HsnSacNo,Quantity,SalePrice,totalperitem,discountGrid,discountAmt,Gst,Igst,wholeTotal,TaxAmount from barreloilbilling  where BillNo =" + billno);
		 
		
		Font font17Bold = new Font(Font.FontFamily.TIMES_ROMAN, 17, Font.BOLD, BaseColor.BLACK);
		Font font16Bold = new Font(Font.FontFamily.TIMES_ROMAN, 16, Font.BOLD, BaseColor.BLACK);
		Font font14 = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.BOLD, BaseColor.BLACK);
		Font font12 = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD, BaseColor.BLACK);
		Font font13 = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.BOLD, BaseColor.BLACK);

		Font Normalfont12 = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.NORMAL, BaseColor.BLACK);
		Font Normalfont13 = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.NORMAL, BaseColor.BLACK);
		Font Normalfont14 = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.NORMAL, BaseColor.BLACK);
		Font ufont14 = new Font(Font.FontFamily.TIMES_ROMAN, 14, Font.UNDERLINE, BaseColor.BLACK);
		Font font16BoldUnderline = new Font(Font.FontFamily.TIMES_ROMAN, 16, Font.BOLD | Font.UNDERLINE, BaseColor.RED);
		Font font25Bold = new Font(Font.FontFamily.TIMES_ROMAN, 18, Font.BOLD , BaseColor.RED);
		Font font13Bold = new Font(Font.FontFamily.TIMES_ROMAN, 13, Font.BOLD, BaseColor.BLACK);

		     /* // Shop Logo start
		
				Image image1 = Image.getInstance("C:/carAccessoriesLOGONew.png");
				image1.scaleToFit(200f, 200f);
				Image imageCenter = Image.getInstance(image1);
				imageCenter.setAlignment(Image.ALIGN_LEFT);
				document.add(imageCenter);
				// End	logo 
		      */
		
		System.out.println("Query Execute");
		      System.out.println("Query23 Execute");
		Date d1 = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MMM-yyyy");
		SimpleDateFormat sdf1 = new SimpleDateFormat("E");
		SimpleDateFormat sdf2 = new SimpleDateFormat("hh:mm:ss  ");
		sdf2.setTimeZone(TimeZone.getTimeZone("IST"));

		String stdver1 = (String) sdf.format(d1);
		String day = sdf1.format(d1.getDate());
		String Time = sdf2.format(d1.getTime());
		String dtfinl = stdver1;

		

	
		rs1.next();
		String wholegrossTotal = rs1.getString("wholeTotal");
		System.out.println("wholegrossTotal++++++"+wholegrossTotal);
		
		//rs2.next();
		/* String service_item2 = rs2.getString("service_item");
		System.out.println("service_item++++++"+service_item2);
		 */
		//Header Containt Table

		PdfPTable headertable = new PdfPTable(2);
		headertable.setWidthPercentage(100);

		float[] HeadercolumnWidths = { 0.2f, 0.5f };
		headertable.setWidths(HeadercolumnWidths);

		PdfPCell headerTable_cell;
		
		 // Shop Logo start
		
		Image image1 = Image.getInstance("C:/carAccessoriesLOGONew.png");
		image1.scaleToFit(200f, 200f);
		Image imageCenter = Image.getInstance(image1);
		imageCenter.setAlignment(Image.ALIGN_LEFT);
		//document.add(imageCenter);
		headerTable_cell = new PdfPCell(new Phrase("", font12));
		headerTable_cell.setImage(image1);
		headerTable_cell.setFixedHeight(70f);
		
		headerTable_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
		//headerTable_cell.setPadding(10);
		headerTable_cell.setBorder(0);
		
		headertable.addCell(headerTable_cell);
		
		// End	logo 
     
		headerTable_cell = new PdfPCell(new Phrase("Bill No : " +billno+""));
		headerTable_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
		headerTable_cell.setColspan(2);
		headerTable_cell.setBorder(0);
		headertable.addCell(headerTable_cell);

		document.add(headertable);

		
		
		PdfPTable headertable2 = new PdfPTable(2);
		headertable2.setWidthPercentage(100);

		float[] HeadercolumnWidths2 = { 0.2f, 0.5f };
		headertable2.setWidths(HeadercolumnWidths2);

		PdfPCell headerTable_cell2;
		
		headerTable_cell2 = new PdfPCell(new Phrase("", font12));
		headerTable_cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
		//headerTable_cell.setPadding(10);
		headerTable_cell2.setBorder(0);
		headertable2.addCell(headerTable_cell2);
		
			
		headerTable_cell2 = new PdfPCell(new Phrase("Date: "));
		headerTable_cell2.setHorizontalAlignment(Element.ALIGN_RIGHT);
		headerTable_cell2.setColspan(2);
		headerTable_cell2.setBorder(Rectangle.NO_BORDER | Rectangle.NO_BORDER);
		headertable2.addCell(headerTable_cell2);

		document.add(headertable2);
		
		

		PdfPTable headertable3 = new PdfPTable(2);
		headertable3.setWidthPercentage(100);

		float[] HeadercolumnWidths3 = { 0.2f, 0.5f };
		headertable3.setWidths(HeadercolumnWidths2);

		PdfPCell headerTable_cell3;
		
		headerTable_cell3 = new PdfPCell(new Phrase("", font12));
		headerTable_cell3.setHorizontalAlignment(Element.ALIGN_LEFT);
		//headerTable_cell.setPadding(10);
		headerTable_cell3.setBorder(0);
		headertable3.addCell(headerTable_cell3);
		
		headerTable_cell3 = new PdfPCell(new Phrase("MOTORODI AUTOMOBILE SERVICE PRIVATE LIMITED", font12));
		headerTable_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
		headerTable_cell3.setColspan(2);
		headerTable_cell3.setBorder(Rectangle.NO_BORDER | Rectangle.NO_BORDER);
		headertable3.addCell(headerTable_cell3);

		document.add(headertable3);
		
		
		/* headerTable_cell = new PdfPCell(new Phrase("MOTORODI AUTOMOBILE SERVICE PRIVATE LIMITED", font12));
		headerTable_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
		headerTable_cell.setColspan(2);
		headerTable_cell.setBorder(Rectangle.NO_BORDER | Rectangle.NO_BORDER | Rectangle.NO_BORDER);
		headertable.addCell(headerTable_cell);
		
		headerTable_cell = new PdfPCell(new Phrase("\n", font13));
		headerTable_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
		headerTable_cell.setColspan(2);
		headerTable_cell.setBorder(Rectangle.NO_BORDER);
		headertable.addCell(headerTable_cell);
		
		*/
		
		
		PdfPTable headertable4 = new PdfPTable(2);
		headertable4.setWidthPercentage(100);

		float[] HeadercolumnWidths4 = { 0.2f, 0.5f };
		headertable4.setWidths(HeadercolumnWidths4);

		PdfPCell headerTable_cell4;
		
		
		headerTable_cell4 = new PdfPCell(new Phrase("", font12));
		headerTable_cell4.setHorizontalAlignment(Element.ALIGN_LEFT);
		//headerTable_cell.setPadding(10);
		headerTable_cell4.setBorder(Rectangle.BOTTOM);
		headertable4.addCell(headerTable_cell4);
		
			
		
		headerTable_cell4 = new PdfPCell(new Phrase("Yashodha nagar,Oppo.kalayani Girls Hostel,Higna Main Road,Nagpur.\n www.motorodi.com | info@motorodi.com", Normalfont12));
		headerTable_cell4.setHorizontalAlignment(Element.ALIGN_RIGHT);
		headerTable_cell4.setColspan(2);
		headerTable_cell4.setBorder(Rectangle.BOTTOM);
		headertable4.addCell(headerTable_cell4);

		document.add(headertable4);
		
		/* headerTable_cell = new PdfPCell(new Phrase("Yashodha nagar,Oppo.kalayani Girls Hostel,Higna Main Road,Nagpur.\n www.motorodi.com | info@motorodi.com", Normalfont12));
		headerTable_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
		headerTable_cell.setColspan(2);
		headerTable_cell.setBorder(Rectangle.BOTTOM);
		headertable.addCell(headerTable_cell);  */
		
		
//		document.add(headertable);
		

		//information table

		PdfPTable infotable = new PdfPTable(3);
		infotable.setWidthPercentage(100);

		float[] infoColumnWidths = { 0.3f,0.3f,0.3f };
		infotable.setWidths(infoColumnWidths);

		PdfPCell InfoTable_cell;
		

		InfoTable_cell = new PdfPCell(new Phrase("\n\nCustomerName: " ));
		InfoTable_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
		InfoTable_cell.setBorder(Rectangle.NO_BORDER);
		infotable.addCell(InfoTable_cell);

		InfoTable_cell = new PdfPCell(new Phrase("\n\nVehicle No: "));
		InfoTable_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
		InfoTable_cell.setBorder(Rectangle.NO_BORDER);
		infotable.addCell(InfoTable_cell);
		
		/* InfoTable_cell = new PdfPCell(new Phrase("\n\nJob Card No #206"));
		InfoTable_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
		InfoTable_cell.setBorder(Rectangle.NO_BORDER);
		infotable.addCell(InfoTable_cell);
 */

		InfoTable_cell = new PdfPCell(new Phrase("\n\nContact No: "));
		InfoTable_cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
		InfoTable_cell.setBorder(Rectangle.NO_BORDER);
		infotable.addCell(InfoTable_cell);

		 InfoTable_cell = new PdfPCell(new Phrase("KM Reading"));
		InfoTable_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
		InfoTable_cell.setBorder(Rectangle.NO_BORDER);
		infotable.addCell(InfoTable_cell); 
		
 
		document.add(infotable);
		
		
	
		
		
		
		
 
    PdfPTable infotable1 = new PdfPTable(1);
	infotable1.setWidthPercentage(100);
	
	float[] infoColumnWidths1 = { 0.8f};
	infotable1.setWidths(infoColumnWidths1);
	
	PdfPCell InfoTable_cell1;

	InfoTable_cell1 = new PdfPCell(new Phrase("\n\nService Spares",font12));
	InfoTable_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
	InfoTable_cell1.setBorder(Rectangle.BOTTOM);
	infotable1.addCell(InfoTable_cell1);
	
	
	document.add(infotable1);
		
		
		//table for particulars
		PdfPTable table = new PdfPTable(10);
		table.setWidthPercentage(100);

		float[] columnWidths = {0.3f,0.5f,0.6f,0.6f, 0.4f,0.4f,0.5f,0.4f,0.5f,0.5f };
		table.setWidths(columnWidths);

		PdfPCell table_cell;
		//rs.beforeFirst();
		

		table_cell = new PdfPCell(new Phrase("Sr.No",font12));
		table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table.addCell(table_cell);
		
		
		table_cell = new PdfPCell(new Phrase("Item Name",font12));
		table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table.addCell(table_cell);
		
		table_cell = new PdfPCell(new Phrase("HSN/SAC",font12));
		table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table.addCell(table_cell);

		table_cell = new PdfPCell(new Phrase("Rate",font12));
		table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table.addCell(table_cell);
		
		table_cell = new PdfPCell(new Phrase("Qty",font12));
		table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table.addCell(table_cell);

		/*  table_cell = new PdfPCell(new Phrase("Test Total",font12));
		table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table.addCell(table_cell);
 */

		/* table_cell = new PdfPCell(new Phrase("SPExTax",font12));
		table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table.addCell(table_cell);
 
  */
		/* table_cell = new PdfPCell(new Phrase("Disc%",font12));
		table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table.addCell(table_cell);

		table_cell = new PdfPCell(new Phrase("Disc Amt",font12));
		table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table.addCell(table_cell);
 */
		table_cell = new PdfPCell(new Phrase("CGST%",font12));
		table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table.addCell(table_cell);
		
		table_cell = new PdfPCell(new Phrase("SGST%",font12));
		table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table.addCell(table_cell);
		
		table_cell = new PdfPCell(new Phrase("IGST%",font12));
		table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table.addCell(table_cell);
		

		table_cell = new PdfPCell(new Phrase("Tax Amt",font12));
		table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table.addCell(table_cell);
		
		table_cell = new PdfPCell(new Phrase("Amount",font12));
		table_cell.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table.addCell(table_cell);

		
		
		//footer of service spares
		    PdfPTable table5 = new PdfPTable(2);
			table5.setWidthPercentage(100);
			
			
			float[] columnWidths5 = {2.0f,0.5f};
			table5.setWidths(columnWidths5);

			PdfPCell table_cell5;
			
			table_cell5 = new PdfPCell(new Phrase("Spare Total"));
			table_cell5.setHorizontalAlignment(Element.ALIGN_LEFT);
			//table_cell5.setBorder(Rectangle.RIGHT|Rectangle.TOP);
			table5.addCell(table_cell5);
			
			
			table_cell5 = new PdfPCell(new Phrase(String.valueOf(subtotal), Normalfont12));
			table_cell5.setHorizontalAlignment(Element.ALIGN_RIGHT);
			//table_cell5.setBorder(Rectangle.TOP);
			table5.addCell(table_cell5);
			
			
			document.add(table5);
			
			
			//footer of service spares
		     PdfPTable table13 = new PdfPTable(2);
			table13.setWidthPercentage(100);
			
			
			float[] columnWidths13 = {2.0f,0.5f};
			table13.setWidths(columnWidths13);

			PdfPCell table_cell13;
			
			table_cell13 = new PdfPCell(new Phrase("Description:" +description));
			table_cell13.setHorizontalAlignment(Element.ALIGN_LEFT);
			//table_cell5.setBorder(Rectangle.RIGHT|Rectangle.TOP);
			table13.addCell(table_cell13);
			
			

			table_cell13 = new PdfPCell(new Phrase(String.valueOf(disc), Normalfont12));
			table_cell13.setHorizontalAlignment(Element.ALIGN_RIGHT);
			//table_cell5.setBorder(Rectangle.TOP);
			table13.addCell(table_cell13);
			 
			
			document.add(table13); 
			
			
	///////service tasks///////		
			
			 PdfPTable infotable2 = new PdfPTable(1);
	         infotable2.setWidthPercentage(100);
	
	float[] infoColumnWidths2 = { 0.8f};
	infotable2.setWidths(infoColumnWidths2);
	
	PdfPCell InfoTable_cell2;

	InfoTable_cell2 = new PdfPCell(new Phrase("\n\nService tasks",font12));
	InfoTable_cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
	InfoTable_cell2.setBorder(Rectangle.BOTTOM);
	infotable2.addCell(InfoTable_cell2);
	
	
	document.add(infotable2);
			
	//
	 	//table for particulars
		PdfPTable table1 = new PdfPTable(10);
		table1.setWidthPercentage(100);

		float[] columnWidths1 = {0.5f,0.5f,0.6f,0.6f, 0.6f,0.4f,0.5f,0.4f,0.5f,0.5f};
		table1.setWidths(columnWidths1);

		PdfPCell table_cell1;
		rs2.beforeFirst();
		

		table_cell1 = new PdfPCell(new Phrase("Sr.No",font12));
		table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell1.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table1.addCell(table_cell1);
		
		
		table_cell1 = new PdfPCell(new Phrase("Item Name",font12));
		table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell1.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table1.addCell(table_cell1);
		
		table_cell1 = new PdfPCell(new Phrase("HSN/SAC",font12));
		table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell1.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table1.addCell(table_cell1);

		table_cell1 = new PdfPCell(new Phrase("Rate",font12));
		table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell1.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table1.addCell(table_cell1);
		
		table_cell1 = new PdfPCell(new Phrase("Qty",font12));
		table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell1.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table1.addCell(table_cell1);


		/* table_cell1 = new PdfPCell(new Phrase("Disc%",font12));
		table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell1.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table1.addCell(table_cell1);

		table_cell1 = new PdfPCell(new Phrase("Disc Amt",font12));
		table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell1.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table1.addCell(table_cell1);
 */
		table_cell1 = new PdfPCell(new Phrase("CGST%",font12));
		table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell1.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table1.addCell(table_cell1);
		
		table_cell1 = new PdfPCell(new Phrase("SGST%",font12));
		table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell1.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table1.addCell(table_cell1);
		
		table_cell1 = new PdfPCell(new Phrase("IGST%",font12));
		table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell1.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table1.addCell(table_cell1);
		
		table_cell1 = new PdfPCell(new Phrase("Tax Amt",font12));
		table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell1.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table1.addCell(table_cell1);
		
		
		table_cell1 = new PdfPCell(new Phrase("Amount",font12));
		table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell1.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table1.addCell(table_cell1); 

		
		 int srno1=1;
		while (rs2.next()) {
			
			table_cell1 = new PdfPCell(new Phrase(""+srno1, Normalfont12));
			table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell1.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table1.addCell(table_cell1);
			
			srno1++;  

			String service_item = rs2.getString("service_item");
			System.out.println("service_item+++++"+service_item);
			table_cell1 = new PdfPCell(new Phrase(service_item));
			table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell1.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table1.addCell(table_cell1);

			String service_hsn = rs2.getString("service_hsn");
			table_cell1 = new PdfPCell(new Phrase(service_hsn));
			table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell1.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table1.addCell(table_cell1);

			String service_saleprice = String.valueOf(rs2.getDouble("service_saleprice"));
			table_cell1 = new PdfPCell(new Phrase(service_saleprice));
			table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell1.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table1.addCell(table_cell1);

			
			
			String service_quantity = String.valueOf(rs2.getString("service_quantity"));
			table_cell1 = new PdfPCell(new Phrase(service_quantity));
			table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell1.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table1.addCell(table_cell1);

		/* 	
			String service_disc_grid = String.valueOf(rs2.getDouble("service_disc_grid"));
			table_cell1 = new PdfPCell(new Phrase(service_disc_grid));
			table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell1.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table1.addCell(table_cell1);

			String service_discAmt = String.valueOf(rs2.getDouble("service_discAmt"));
			table_cell1 = new PdfPCell(new Phrase(service_discAmt));
			table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell1.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table1.addCell(table_cell1);
			 */
			double cgstService;
			cgstService=rs2.getDouble("service_gst");
			double cgst1=cgstService/2;
			
			
			//String service_gst = String.valueOf(rs.getDouble("service_gst"));
			table_cell1 = new PdfPCell(new Phrase("" + cgst1));
			table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell1.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table1.addCell(table_cell1);

			table_cell1 = new PdfPCell(new Phrase("" + cgst1));
			table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell1.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table1.addCell(table_cell1);
			
			String service_igst = String.valueOf(rs2.getDouble("service_igst"));
			table_cell1 = new PdfPCell(new Phrase(service_igst));
			table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell1.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table1.addCell(table_cell1);
			
			
			String service_taxAmt = String.valueOf(rs2.getDouble("service_taxAmt"));
			table_cell1 = new PdfPCell(new Phrase(service_taxAmt));
			table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell1.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table1.addCell(table_cell1);
			
			
			service_totalGrid = rs2.getDouble("service_totalGrid");
			subtotal1=subtotal1+service_totalGrid;
			//roudoffsubtotal=Math.round(subtotal * 100) / 100;
			
			table_cell1 = new PdfPCell(new Phrase(String.valueOf(service_totalGrid), Normalfont12));
			table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell1.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table1.addCell(table_cell1);
			
		} 

		document.add(table1);
			
		//footer of service task
	    PdfPTable table6 = new PdfPTable(2);
		table6.setWidthPercentage(100);
		
		
		float[] columnWidths6 = {2.0f,0.6f};
		table6.setWidths(columnWidths6);

		PdfPCell table_cell6;
		
		table_cell6 = new PdfPCell(new Phrase("Service Tasks"));
		table_cell6.setHorizontalAlignment(Element.ALIGN_LEFT);
		//table_cell6.setBorder(Rectangle.RIGHT|Rectangle.TOP);
		table6.addCell(table_cell6);
		
		
		table_cell6 = new PdfPCell(new Phrase(String.valueOf(subtotal1), Normalfont12));
		table_cell6.setHorizontalAlignment(Element.ALIGN_RIGHT);
		//table_cell6.setBorder(Rectangle.TOP);
		table6.addCell(table_cell6);
		
		document.add(table6);	
			
	///////gross total///////
	/*  PdfPTable infotable3 = new PdfPTable(2);
	infotable3.setWidthPercentage(100);
	
	float[] infoColumnWidths3 = { 2.0f,0.5f};
	infotable3.setWidths(infoColumnWidths3);
	
	PdfPCell InfoTable_cell3;mmmm

	InfoTable_cell3 = new PdfPCell(new Phrase("\nGross Total",font14));
	InfoTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
	InfoTable_cell3.setBorder(Rectangle.NO_BORDER);
	infotable3.addCell(InfoTable_cell3);
	
	 
	InfoTable_cell3 = new PdfPCell(new Phrase("\n"+grossTotal123,font14));
	InfoTable_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
	InfoTable_cell3.setBorder(Rectangle.NO_BORDER);
	infotable3.addCell(InfoTable_cell3);
	 
	
	long longGrandTotalAmt = Math.round(Double.valueOf(grossTotal123));
	String strGrandTotalAmt = String.valueOf(longGrandTotalAmt);
	int intGrandTotalAmt = Integer.parseInt(strGrandTotalAmt);
	NumToWord w = new NumToWord();
	String amtInWord = w.convert(intGrandTotalAmt);

	InfoTable_cell3 = new PdfPCell(new Phrase("\n Rupees in words : " + amtInWord + " Only/- "));
	InfoTable_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
	InfoTable_cell3.setBorder(Rectangle.NO_BORDER);
	InfoTable_cell3.setColspan(7);
	infotable3.addCell(InfoTable_cell3); 
	
	
	document.add(infotable3); */
		
	////footer///
	
	/* 
		PdfPTable headertable1 = new PdfPTable(4);
		headertable1.setWidthPercentage(100);

		float[] HeadercolumnWidths1 = { 0.4f, 0.3f,0.4f,0.4f };
		headertable1.setWidths(HeadercolumnWidths1);

		PdfPCell headerTable_cell1;
		
		
		headerTable_cell1 = new PdfPCell(new Phrase("\nspeed Automobile \n +919960814821 \n vkamthe757@gmail.com\nPlot No.101,Royal Plaza, C.D.C.,\n Chinchwad,Purna Nagar,Pune 411 019",Normalfont12));
		headerTable_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
		//headerTable_cell1.setColspan(2);
		headerTable_cell1.setBorder(Rectangle.TOP | Rectangle.BOTTOM| Rectangle.LEFT|Rectangle.RIGHT);
		headertable1.addCell(headerTable_cell1);


		headerTable_cell1 = new PdfPCell(new Phrase("\n\n\n\n\n\nCustomer's Signature",Normalfont12));
		//headerTable_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
		headerTable_cell1.setColspan(2);
		headerTable_cell1.setBorder(Rectangle.TOP | Rectangle.BOTTOM| Rectangle.LEFT|Rectangle.RIGHT);
		headertable1.addCell(headerTable_cell1);

		headerTable_cell1 = new PdfPCell(new Phrase("\n\n\n\n\n\nAuthorised Signatory.\n Speed Automobile"));
		//headerTable_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
		headerTable_cell1.setColspan(2);
		headerTable_cell1.setBorder(Rectangle.TOP | Rectangle.BOTTOM| Rectangle.LEFT|Rectangle.RIGHT);
		headertable1.addCell(headerTable_cell1);

	
	document.add(headertable1);
		 */
	///////oil tasks///////		
			
				 PdfPTable infotable5 = new PdfPTable(1);
		         infotable5.setWidthPercentage(100);
		
		float[] infoColumnWidths5 = { 0.8f};
		infotable5.setWidths(infoColumnWidths5);
		
		PdfPCell InfoTable_cell5;

		InfoTable_cell5 = new PdfPCell(new Phrase("\n\n Oil ",font12));
		InfoTable_cell5.setHorizontalAlignment(Element.ALIGN_LEFT);
		InfoTable_cell5.setBorder(Rectangle.BOTTOM);
		infotable5.addCell(InfoTable_cell5);
		
		
		document.add(infotable5);
			
			
	//table for particulars for oil
		PdfPTable table9 = new PdfPTable(9);
		table9.setWidthPercentage(100);

		float[] columnWidths9 = {0.5f,0.6f,0.4f, 0.4f,0.4f,0.5f,0.4f,0.5f,0.5f};
		table9.setWidths(columnWidths9);

		PdfPCell table_cell10;
		rs1.beforeFirst();
		
/* 
	    table_cell1 = new PdfPCell(new Phrase("Sr.No",font12));
		table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell1.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table1.addCell(table_cell1);
		  */
		
		 table_cell10 = new PdfPCell(new Phrase("Item Name",font12));
		 table_cell10.setHorizontalAlignment(Element.ALIGN_LEFT);
		 table_cell10.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		 table9.addCell(table_cell10);
		
		table_cell10 = new PdfPCell(new Phrase("HSN/SAC",font12));
		table_cell10.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell10.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table9.addCell(table_cell10);

		table_cell10 = new PdfPCell(new Phrase("Rate",font12));
		table_cell10.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell10.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table9.addCell(table_cell10);
		
		table_cell10 = new PdfPCell(new Phrase("Qty",font12));
		table_cell10.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell10.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table9.addCell(table_cell10);

/* 
		table_cell10 = new PdfPCell(new Phrase("Disc%",font12));
		table_cell10.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell10.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table9.addCell(table_cell10);

		table_cell10 = new PdfPCell(new Phrase("Disc Amt",font12));
		table_cell10.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell10.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table9.addCell(table_cell10);
 */
		table_cell10 = new PdfPCell(new Phrase("CGST%",font12));
		table_cell10.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell10.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table9.addCell(table_cell10);
		
		table_cell10 = new PdfPCell(new Phrase("SGST%",font12));
		table_cell10.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell10.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table9.addCell(table_cell10);
		
		
		table_cell10 = new PdfPCell(new Phrase("Igst%",font12));
		table_cell10.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell10.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table9.addCell(table_cell10);
		

		table_cell10 = new PdfPCell(new Phrase("Tax Amt",font12));
		table_cell10.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell10.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table9.addCell(table_cell10);
		
		
		
		
		table_cell10 = new PdfPCell(new Phrase("Amount",font12));
		table_cell10.setHorizontalAlignment(Element.ALIGN_LEFT);
		table_cell10.setBorder(Rectangle.BOTTOM|Rectangle.LEFT | Rectangle.RIGHT);
		table9.addCell(table_cell10); 

		
		//int srno2=1;
		while (rs1.next()) {
			
			/*  table_cell1 = new PdfPCell(new Phrase(""+srno2, Normalfont12));
			table_cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell1.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table1.addCell(table_cell1);
			
			srno2++; 	 */
			 
			

			String ItemName1 = rs1.getString("ItemName");
			table_cell10 = new PdfPCell(new Phrase("\n " + ItemName1));
			table_cell10.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell10.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table9.addCell(table_cell10);

			String HsnSacNo1 = rs1.getString("HsnSacNo");
			table_cell10 = new PdfPCell(new Phrase("\n " + HsnSacNo1));
			table_cell10.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell10.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table9.addCell(table_cell10);

			String SalePrice1 = String.valueOf(rs1.getDouble("SalePrice"));
			table_cell10 = new PdfPCell(new Phrase("\n " + SalePrice1));
			table_cell10.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell10.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table9.addCell(table_cell10);

			
			
			//String Quantity1 = String.valueOf(rs1.getString("Quantity"));
			String Quantity1 = String.valueOf(rs1.getDouble("Quantity"));
			table_cell10 = new PdfPCell(new Phrase("\n " + Quantity1));
			table_cell10.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell10.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table9.addCell(table_cell10);

			
			/* String discountGrid1 = String.valueOf(rs1.getDouble("discountGrid"));
			table_cell10 = new PdfPCell(new Phrase("\n " + discountGrid1));
			table_cell10.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell10.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table9.addCell(table_cell10);

			String discountAmt1 = String.valueOf(rs1.getDouble("discountAmt"));
			table_cell10 = new PdfPCell(new Phrase("\n " + discountAmt1));
			table_cell10.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell10.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table9.addCell(table_cell10);
 */
			double cgst;
			//String Gst1 = String.valueOf(rs1.getDouble("Gst"));
			cgst=rs1.getDouble("Gst");
			double cgst1=cgst/2;
			
			table_cell10 = new PdfPCell(new Phrase("\n " + cgst1));
			table_cell10.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell10.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table9.addCell(table_cell10);
			
			//String sGst = String.valueOf(rs1.getDouble("Gst"));
			table_cell10 = new PdfPCell(new Phrase("\n " + cgst1));
			table_cell10.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell10.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table9.addCell(table_cell10);
			
			String Igst1 = String.valueOf(rs1.getDouble("Igst"));
			table_cell10 = new PdfPCell(new Phrase("\n " + Igst1));
			table_cell10.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell10.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table9.addCell(table_cell10);

			String TaxAmount = String.valueOf(rs1.getDouble("TaxAmount"));
			table_cell10 = new PdfPCell(new Phrase("\n " +TaxAmount));
			table_cell10.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell10.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table9.addCell(table_cell10);
			
			
			totalperitem = rs1.getDouble("totalperitem");
			subtotalOil1=subtotalOil1+totalperitem;
			//roudoffsubtotal=Math.round(subtotal * 100) / 100;
			
			table_cell10 = new PdfPCell(new Phrase(String.valueOf("\n"+totalperitem), Normalfont12));
			table_cell10.setHorizontalAlignment(Element.ALIGN_LEFT);
			table_cell10.setBorder(Rectangle.LEFT | Rectangle.RIGHT);
			table9.addCell(table_cell10);
			
		} 

		document.add(table9);
	
		//footer of service task
	    PdfPTable table11 = new PdfPTable(2);
	    table11.setWidthPercentage(100);
		
		
		float[] columnWidths11 = {2.0f,0.6f};
		table11.setWidths(columnWidths11);

		PdfPCell table_cell11;
		
		table_cell11 = new PdfPCell(new Phrase("Oil sub total"));
		table_cell11.setHorizontalAlignment(Element.ALIGN_LEFT);
		//table_cell6.setBorder(Rectangle.RIGHT|Rectangle.TOP);
		table11.addCell(table_cell11);
		
		
		table_cell11 = new PdfPCell(new Phrase(String.valueOf(subtotalOil1), Normalfont12));
		table_cell11.setHorizontalAlignment(Element.ALIGN_RIGHT);
		//table_cell6.setBorder(Rectangle.TOP);
		table11.addCell(table_cell11);
		
		document.add(table11);	
			///whole gross total////
			
		 PdfPTable infotable3 = new PdfPTable(2);
			infotable3.setWidthPercentage(100);
			
			float[] infoColumnWidths3 = { 2.0f,0.5f};
			infotable3.setWidths(infoColumnWidths3);
			
			PdfPCell InfoTable_cell3;

			InfoTable_cell3 = new PdfPCell(new Phrase("\nGrand Gross Total",font14));
			InfoTable_cell3.setHorizontalAlignment(Element.ALIGN_CENTER);
			InfoTable_cell3.setBorder(Rectangle.NO_BORDER);
			infotable3.addCell(InfoTable_cell3);
			
			
			InfoTable_cell3 = new PdfPCell(new Phrase("\n"+wholegrossTotal,font14));
			InfoTable_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
			InfoTable_cell3.setBorder(Rectangle.NO_BORDER);
			infotable3.addCell(InfoTable_cell3);
			 
			
			long longGrandTotalAmt = Math.round(Double.valueOf(wholegrossTotal));
			String strGrandTotalAmt = String.valueOf(longGrandTotalAmt);
			int intGrandTotalAmt = Integer.parseInt(strGrandTotalAmt);
			NumToWord w = new NumToWord();
			String amtInWord = w.convert(intGrandTotalAmt);

			InfoTable_cell3 = new PdfPCell(new Phrase("\n Rupees in words : " + amtInWord + " Only/- "));
			InfoTable_cell3.setHorizontalAlignment(Element.ALIGN_RIGHT);
			InfoTable_cell3.setBorder(Rectangle.NO_BORDER);
			InfoTable_cell3.setColspan(7);
			infotable3.addCell(InfoTable_cell3); 
			
			
			document.add(infotable3);
		// step 5
		
		
		rs2.close();
		rs1.close();
		stmt.close();
		stmt2.close();
		stmt1.close();
		
		conn.close();
		document.close();
		
		////////email functionality/////// 
		try{
	          Session mailSession = Session.getInstance(System.getProperties());
	          Transport transport = new SMTPTransport(mailSession,new URLName("smtp.gmail.com"));
	          transport = mailSession.getTransport("smtps");
	          transport.connect("smtp.gmail.com", 465 ,"embelmessanger@gmail.com","embel@123");
	          
	          MimeMessage m = new MimeMessage(mailSession); 
	          m.setFrom(new InternetAddress("embelbackup@gmail.com"));
	          Address[] toAddr = new InternetAddress[] {
	          new InternetAddress("embelbackup@gmail.com")
	          };
	          m.setRecipients(javax.mail.Message.RecipientType.TO, toAddr );
	          m.setHeader("Content-Type", "multipart/mixed");
	          m.setSubject("customer Bill");
	          m.setSentDate(new java.util.Date());

	          MimeBodyPart messageBodyPart = new MimeBodyPart();
	          messageBodyPart.setText("");
	          Multipart multipart = new MimeMultipart();
	          multipart.addBodyPart(messageBodyPart);

	          
	          messageBodyPart = new MimeBodyPart();
	          DataSource source = new ByteArrayDataSource(baos.toByteArray(), "application/pdf");
	          messageBodyPart.setDataHandler(new DataHandler(source));
	          messageBodyPart.setFileName("car_bill__Pdf.pdf");
	          multipart.addBodyPart(messageBodyPart);
				
	       
	          m.setContent(multipart);

	          transport.sendMessage(m,m.getAllRecipients());
	          transport.close();
	          out.println("Thanks for sending mail!");
	        }
	        catch(Exception e){
	          out.println(e.getMessage());
	          e.printStackTrace();
	        }

		

	} catch (DocumentException de) {
		throw new IOException(de.getMessage());
	}
%> 
		 
		 
		 
		 