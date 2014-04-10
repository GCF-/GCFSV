package com.dt.enterprise.gcf.utils;

import java.lang.reflect.InvocationTargetException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Common Function (Utility, parse JSON, convert..).
 * 
 */
public class CommonFunction {
    private static Log LOG = LogFactory.getLog(CommonFunction.class);
    private static DateFormat dateTimeFormat = new SimpleDateFormat(Constants.STRING_DATETIME_FM);

    
    /**
     * <b>Method check string is empty.</b>
     * @param obj
     *            - string to check empty.
     * @return true if string is empty and vice versa.
     */
    public static boolean isEmpty(String obj) {
	return null == obj || Constants.EMPTY_STRING.equals(obj.trim());
    }

    /**
     * <p>
     * test valid number.
     * </p>
     * \
     * @param value
     *            : String return true or false
     * @return boolean
     */
    public static boolean isInteger(String value) {
	boolean reValue = false;
	try {
	    Integer.parseInt(value);
	    reValue = true;
	} catch (NumberFormatException e) {
	    reValue = false;
	}
	return reValue;
    }

    /**
     * @param inVal
     *            a list need to be checked
     * @return TRUE if a normal list
     */
    public static boolean isNormalList(List<? extends Object> inVal) {
	return inVal != null && !inVal.isEmpty();
    }

    /**
     * just workaround checkstyle warning (Boolean expression complexity).
     * @param bs
     *            list of boolean values list of boolean values
     * @return true if all values are true
     */
    public static boolean testMultiBoolean(boolean... bs) {
	boolean retVal = true;
	for (boolean item : bs) {
	    if (!item) {
		retVal = false;
		break;
	    }
	}
	return retVal;
    }

    /**
     * clone object.
     * @param object
     *            object to clone
     * @return object return
     */
    public static Object cloneObject(Object object) {
	Object dest = null;
	try {
	    dest = BeanUtils.cloneBean(object);
	} catch (IllegalAccessException e) {
	    e.printStackTrace();
	} catch (InstantiationException e) {
	    e.printStackTrace();
	} catch (InvocationTargetException e) {
	    e.printStackTrace();
	} catch (NoSuchMethodException e) {
	    e.printStackTrace();
	}

	return dest;
    }
    
    /**
     * Get string.
     * @param str
     * :String
     * @return String
     */
    public static String getString(String str) {
    	return str == null ? Constants.EMPTY_STRING : str;
    }
}
