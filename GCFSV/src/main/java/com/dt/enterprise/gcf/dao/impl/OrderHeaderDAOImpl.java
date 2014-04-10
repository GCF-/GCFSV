package com.dt.enterprise.gcf.dao.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import com.dt.enterprise.gcf.dao.OrderHeaderDAO;
import com.dt.enterprise.gcf.dao.mapper.OrderHeaderMapper;
import com.dt.enterprise.gcf.model.vo.ReasonModel;
import com.dt.enterprise.gcf.utils.GCFException;

/**
 * OrderHeaderDAOImpl.
 *
 */
@Repository
public class OrderHeaderDAOImpl extends BaseDAOImpl implements OrderHeaderDAO {

	private static final Logger LOG = Logger.getLogger(OrderHeaderDAOImpl.class);

    @Value("${com.sql.getReason}")
    private String getReasonListSql;

    
	/**
	 * get list Reason from Database.
	 *
	 * @return List<ReasonModel>
	 */
	@Override
	public List<ReasonModel> getListReason() throws GCFException {
		LOG.info("Enter getListReason !!!");
		List<ReasonModel> lstReason = BaseDAOImpl.jdbcTemplate.query(this.getReasonListSql, OrderHeaderMapper.getReason());
		return lstReason;
	}
}
