package com.dt.enterprise.gcf.dao;

import java.util.List;

import com.dt.enterprise.gcf.model.vo.ReasonModel;
import com.dt.enterprise.gcf.utils.GCFException;

public interface OrderHeaderDAO extends BaseDAO {
	
	/**
	 * get list Reason from Database
	 *
	 * @return List<ReasonModel>
	 */
	List<ReasonModel> getListReason() throws GCFException;
	
}
