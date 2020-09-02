package com.smt.helper;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.smt.bean.BillBean;
import com.smt.bean.ProductDetailsToEdit;
import com.smt.bean.ServiceBean;
import com.smt.dao.CarEntryDao;
import com.smt.dao.CategoryDao;
import com.smt.dao.CustomerOrderDao;
import com.smt.dao.GoodReciveDao;
import com.smt.dao.ProductDetailDao;
import com.smt.dao.ServiceDao;
import com.smt.dao.StockDao;
import com.smt.hibernate.Category;
import com.smt.hibernate.CustomerBill;
import com.smt.hibernate.ProductRegister;
import com.smt.hibernate.ServiceDetail;
import com.smt.hibernate.Stock;
import com.smt.hibernate.SupplierDetail;
import com.smt.utility.HibernateUtility;

public class ServiceHelper {
	

	// other bill
		public ServiceBean getDetailsByProd1(HttpServletRequest request,HttpServletResponse response) {
			// TODO Auto-generated method stub
			String productIdService=request.getParameter("productIdService");
			
			System.out.println(productIdService+"Service Name");
			Map<Long,ServiceBean> map = new HashMap<Long,ServiceBean>();
			
			ServiceDao dao = new ServiceDao();
			List<ServiceBean> catList = dao.getAllItemDetails1(productIdService);
			
			ServiceBean sb = null;
			if(catList!= null && catList.size() > 0 )
			{	
				 sb = (ServiceBean)catList.get(0); 
			}
			return  sb;
		}
		//
		
		
		public ServiceBean getDetailsByProd1es(HttpServletRequest request,HttpServletResponse response) {
			// TODO Auto-generated method stub
			String productIdService=request.getParameter("productIdService");
			
			System.out.println(productIdService+"Service Name");
			Map<Long,ServiceBean> map = new HashMap<Long,ServiceBean>();
			
			ServiceDao dao = new ServiceDao();
			List<ServiceBean> catList = dao.getAllItemDetails1es(productIdService);
			
			ServiceBean sb = null;
			if(catList!= null && catList.size() > 0 )
			{	
				 sb = (ServiceBean)catList.get(0); 
			}
			return  sb;
		}
		
	////////////////////////////////
		
		// car register Bill 
				public void registerServiceBill(HttpServletRequest request,
						HttpServletResponse response) {
					
					
					CustomerBill cust = new CustomerBill();
					
					Integer count = Integer.parseInt(request.getParameter("count"));
					System.out.println("c111111"+count);

					for(int i=0;i<count;i++)
					
					{

						String itemName = request.getParameter("itemName"+i);
						cust.setService_item(itemName);
						
						String hsnSacNo = request.getParameter("hsnSacNo"+i);
						cust.setService_hsn(hsnSacNo);
						
						String quantity= request.getParameter("quantity"+i);
						System.out.println("quantity"+quantity);
			            cust.setService_quantity(Long.parseLong(quantity));
			            
			            String salePrice= request.getParameter("salePrice"+i);
						cust.setService_saleprice(Double.parseDouble(salePrice));
			            
			            
			            
						String discountGrid = request.getParameter("discountGrid"+i);
						cust.setService_disc_grid(Double.parseDouble(discountGrid));
						
						String discountAmt = request.getParameter("discountAmt"+i);
						cust.setService_discAmt(Double.parseDouble(discountAmt));
						
						String vat = request.getParameter("vat"+i);
						String igst = request.getParameter("igst"+i);
						System.out.println("vat & igst  - "+vat+" & "+igst);
						
						cust.setService_gst(Double.parseDouble(vat));
						cust.setService_igst(Double.parseDouble(igst));
						
						String taxAmount = request.getParameter("taxAmount"+i);
						cust.setTaxAmount(Double.parseDouble(taxAmount));
			            
						String totalAmount = request.getParameter("totalAmount");
						cust.setServiceTotalAmt(Double.parseDouble(totalAmount));
						
						String total = request.getParameter("total"+i);
						cust.setServicetotalPerItem(Double.parseDouble(total));
						
						ServiceDao dao=new ServiceDao();
						dao.registerBill(cust);
						
						
						
				       
					}
				    
					
				}
				
				

				public Map getProductDetailsForEdit(String productId) {
					
				 	System.out.println("into helper class");
				 	ServiceDao dao1 = new ServiceDao();
					List catList = dao1.getAllProductSetailsForEdit(productId);
					
					Map  map =  new HashMap();
					for(int i=0;i<catList.size();i++)
					{
						Object[] o = (Object[])catList.get(i);
					
						ServiceBean bean = new ServiceBean();
						bean.setItemName(o[0].toString());
						//String vat = o[1].toString();
						//bean.setVat(Double.parseDouble(vat));
						
						String pkId = o[1].toString();
						bean.setHsnsacno(o[2].toString());
						bean.setPkProductId(Long.parseLong(pkId));
						
						map.put(bean.getPkProductId(),bean);
					}
					System.out.println("out of helper return map : "+map);
					return map;
				}
				//
				public Map getgst(String productId) {
					
				 	System.out.println("into helper class");
				 	ServiceDao dao1 = new ServiceDao();
					List catList = dao1.getAllgst(productId);
					
					Map  map =  new HashMap();
					for(int i=0;i<catList.size();i++)
					{
						Object[] o = (Object[])catList.get(i);
					
						SupplierDetail bean = new SupplierDetail();

						bean.setSupplierId(Long.parseLong(o[0].toString()));
						bean.setPanNo(o[1].toString());

						
						map.put(bean.getSupplierId(),bean);
					}
					System.out.println("out of helper return map : "+map);
					return map;
				}
				//
				public Map getgstt(String productId) {
					
				 	System.out.println("into helper class");
				 	ServiceDao dao1 = new ServiceDao();
					List catList = dao1.getAllgstt(productId);
					
					Map  map =  new HashMap();
					for(int i=0;i<catList.size();i++)
					{
						Object[] o = (Object[])catList.get(i);
					
						SupplierDetail bean = new SupplierDetail();

						bean.setSupplierId(Long.parseLong(o[0].toString()));
						bean.setPanNo(o[1].toString());

						
						map.put(bean.getSupplierId(),bean);
					}
					System.out.println("out of helper return map : "+map);
					return map;
				}
				
				public void editProductDetail(HttpServletRequest request,
						HttpServletResponse response) {
				
					String productId = request.getParameter("productId");
					String itemName = request.getParameter("itemName");
					String hsnsacno = request.getParameter("hsnsacno");
					
					HibernateUtility hbu=null;
					Session session = null;
					Transaction transaction = null;
					
					 hbu = HibernateUtility.getInstance();
					session = hbu.getHibernateSession();
					 transaction = session.beginTransaction();
				
					//long customerId = Long.parseLong(customerId);
					 System.out.println("%%%%%%%%%%%%%%%%% Product id :"+productId);
					long productID =Long.parseLong(productId);
					ServiceDetail det = (ServiceDetail) session.get(ServiceDetail.class, productID);
					
					if (!"".equals(itemName)) {
						det.setItemName(itemName);
					} else {
						det.setItemName("N/A");
					}
					
					det.setHsnsacno(hsnsacno);
				    session.saveOrUpdate(det);
					transaction.commit();
					session.close();
					System.out.println("Record updated successfully.");
				
				
				
				}
				
				

}
