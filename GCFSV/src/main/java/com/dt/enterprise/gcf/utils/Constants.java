
package com.dt.enterprise.gcf.utils;

/**
 * Constants for bussiness
 * 
 * 
 */
public class Constants {
	// FORMAT DATE TIME
	public static final String TIMESTAM_FULL_FORMAT = "DD-Mon-RR HH24:MI:SS.FF";
	public static final String DATE_FULL_FORMAT = "DD-Mon-RR";
	public static final String MINUTE_FORMAT = "YYYY/MM/DD/HH24/MI";
	public static final String DATE_FORMAT = "YYYY/MM/DD";
	public static final String SHORT_DATE_FORMAT = "dd-MMM-yy";
	public static final String DATETIME_FORMAT_SPLASH = "yyyy/MM/dd/hh/mm";
	public static final String DATE_FORMAT_SPLASH = "yyyy/MM/dd";
	public static final String STRING_DATETIME_FM = "MM/dd/yyyy hh:mm:ss";
	public static final String FILE_BEAN_XML = "beans.xml";
	public static final String BASE_JDBC_TEMPLATE = "baseJDBCTemplate";

	public static final String ERROR = "-errors";
	public static final String TABLES_KEY = "tables";
	public static final String DOT = ".";
	public static final String STR_TITLE = "TITLE";

	public static final String STR_ADD = "Add";
	public static final String STR_EDIT = "Edit";
	public static final String STR_DELETE = "Delete";

	public static final String END_LINE = "\n";
	public static final String EMPTY_STRING = "";
	public static final String WHITE_SPACE = " ";
	public static final String QUOTESTRING = "'";
	public static final String ERROR_ATTRIBUTE = "errors";
	public static final String RESULT_OF_SEARCH_ORDERS = "orderResult";
	public static final String NOT_FOUND_ATTRIBUTE = "notFound";
	public static final String NULL_VALUE = "null";

	/**
	 * ALL_STR.
	 */
	public static final String ALL_STR = "all";
	/**
	 * JSON_EMPTY.
	 */
	public static final String JSON_EMPTY = "[]";

	/**
	 * ORDERS_SESSION_NAME.
	 */
	public static final String ORDERS_SESSION_NAME = "orderList";
	/**
	 * FILTER_ORDERS_SESSION_NAME.
	 */
	public static final String FILTER_ORDERS_SESSION_NAME = "filteredOrders";
	/**
	 * FILTERED_STATUS_CD.
	 */
	public static final String FILTERED_STATUS_CD = "filteredStatusCd";
	/**
	 * ORDERS_BASKET_SESSION_NAME.
	 */
	public static final String ORDERS_BASKET_SESSION_NAME = "orderInBasket";
	/**
	 * ORDERS_FULFILLMENT_SESSION_NAME.
	 */
	public static final String ORDERS_FULFILLMENT_SESSION_NAME = "ordersFulfillment";
	/**
	 * COMMAS.
	 */
	public static final String COMMAS = ",";

	/**
	 * DATE_FORMAT_MM_DD_YYYY.
	 */
	public static final String DATE_FORMAT_MM_DD_YYYY = "MM/dd/yyyy";

	/**
	 * OPEN - Need to be fulfilled, no activity yet.
	 */
	public static final String ORD_STATUS_OPEN = "OPEN";

	/**
	 * WIP - Fulfillment work has begun on the order.
	 */
	public static final String ORD_STATUS_WIP = "WIP";

	/**
	 * RFSHP - Ready for shipment, all items have been processed
	 */
	public static final String ORD_STATUS_RFSHP = "RFSHP";

	/**
	 * SHIPD - Order has been fulfilled, labels printed, and shipped
	 */
	public static final String ORD_STATUS_SHIPD = "SHIPD";
	/**
	 * COMPL - Order is complete and has been sent back to order system (COMS)
	 */
	public static final String ORD_STATUS_COMPL = "COMPL";

	/**
	 * for SQL statement.
	 */
	public static final String COM_GCF_GET_ORDER_LIST = "com.gcf.get.order.list";

	/**
	 * ORD_ID.
	 */
	public static final String ORD_ID = "GCF_ORD_ID";

	/**
	 * ORD_STAT_CD.
	 */
	public static final String ORD_STAT_CD = "ORD_STAT_CD";

	/**
	 * ORD_HDR_STAT_DES.
	 */
	public static final String ORD_HDR_STAT_DES = "ORD_HDR_STAT_DES";
	/**
	 * Created date.
	 */
	public static final String CRE8_TS = "CRE8_TS";

	/**
	 * Schedule shipping date.
	 */
	public static final String SCH_SHPNG_DT = "SCH_SHPNG_DT";

	/**
	 * First Name field.
	 */
	public static final String CONTC_FRST_NM = "CONTC_FRST_NM";

	/**
	 * Middle Name field.
	 */
	public static final String CONTC_MID_NM = "CONTC_MID_NM";

	/**
	 * Last Name field.
	 */
	public static final String CONTC_LST_NM = "CONTC_LST_NM";

	/**
	 * Customer.
	 */
	public static final String CUSTOMER = "CUST";

	/**
	 * Shipping.
	 */
	public static final String SHIPPING = "SHIP2";

	/**
	 * Phone country.
	 */
	public static final String PHN_CNTRY_CD = "PHN_CNTRY_CD";

	/**
	 * Phone area.
	 */
	public static final String PHN_AREA_CD = "PHN_AREA_CD";

	/**
	 * Phone number.
	 */
	public static final String PHN_NBR = "PHN_NBR";

	/**
	 * Contact address 1.
	 */
	public static final String CONTC_ADR_1_TXT = "CONTC_ADR_1_TXT";

	/**
	 * Contact address 2.
	 */
	public static final String CONTC_ADR_2_TXT = "CONTC_ADR_2_TXT";

	/**
	 * Contact address 3.
	 */
	public static final String CONTC_ADR_3_TXT = "CONTC_ADR_3_TXT";

	/**
	 * Contact address 4.
	 */
	public static final String CONTC_ADR_4_TXT = "CONTC_ADR_4_TXT";

	/**
	 * Contact email id.
	 */
	public static final String CONTC_EMAIL_ID = "CONTC_EMAIL_ID";

	/**
	 * City
	 */
	public static final String CONTC_CTY_TXT = "CONTC_CTY_TXT";

	/**
	 * ??
	 */
	public static final String CONTC_ST_ABB = "CONTC_ST_ABB";

	/**
	 * Zip code
	 */
	public static final String CONTC_ZIP_CD = "CONTC_ZIP_CD";

	/**
	 * Authorization number.
	 */
	public static final String AUTHN_NBR = "AUTHN_NBR";

	/**
	 * Purchaser Type.
	 */
	public static final String CUST_TYP = "CUST_TYP";

	/**
	 * Label Print Status.
	 */
	public static final String SHPNG_LBLS_PRNTED_SW = "SHPNG_LBLS_PRNTED_SW";

	/**
	 * Tracking ID.
	 */
	public static final String FRT_CARR_TRKG_ID = "FRT_CARR_TRKG_ID";
	/**
	 * ORDED QUANTITY.
	 */
	public static final String ORDED_QTY = "ORDED_QTY";
	/**
	 * ORDED SHIPPING DATE.
	 */
	public static final String SHIPPING_DATE = "SHIPPINGDATE";
	/**
	 * ITM_TYP_CD.
	 */
	public static final String ITM_TYP_CD = "ITM_TYP_CD";
	/**
	 * SPLR_SHRT_RSN_CD.
	 */
	public static final String SPLR_SHRT_RSN_CD = "SPLR_SHRT_RSN_CD";
	/**
	 * SPLR_SHRT_RSN_DES.
	 */
	public static final String SPLR_SHRT_RSN_DES = "SPLR_SHRT_RSN_DES";
	/**
	 * LEFT_PARENTHESIS.
	 */
	public static final String LEFT_PARENTHESIS = "(";

	/**
	 * RIGHT_PARENTHESIS.
	 */
	public static final String RIGHT_PARENTHESIS = ")";

	/**
	 * HYPHEN_MINUS.
	 */
	public static final String HYPHEN_MINUS = "-";

	/**
	 * N/A.
	 */
	public static final String NA = "N/A";

	/**
	 * GCF_DTL_NBR.
	 */
	public static final String GCF_DTL_NBR = "GCF_DTL_NBR";

	/**
	 * ORD_CST_PER_UNT_AMT.
	 */
	public static final String ORD_CST_PER_UNT_AMT = "ORD_CST_PER_UNT_AMT";

	/**
	 * SER_NBR_SEQ_NBR.
	 */
	public static final String SER_NBR_SEQ_NBR = "SER_NBR_SEQ_NBR";

	/**
	 * GCF_BEG_SER_NBR.
	 */
	public static final String GCF_BEG_SER_NBR = "GCF_BEG_SER_NBR";

	/**
	 * GCF_END_SER_NBR.
	 */
	public static final String GCF_END_SER_NBR = "GCF_END_SER_NBR";

	/**
	 * ENT_TYP_CD.
	 */
	public static final String ENT_TYP_CD = "ENT_TYP_CD";
}
