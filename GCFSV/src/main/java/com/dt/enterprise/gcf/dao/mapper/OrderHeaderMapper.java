package com.dt.enterprise.gcf.dao.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.dt.enterprise.gcf.model.vo.ReasonModel;
import com.dt.enterprise.gcf.utils.Constants;

public class OrderHeaderMapper {
	
    /**
     * get list Reason from Database
     * @param orderMl
     *            OrderInforModel
     * @return List<OrderInforModel>
     */
    public static RowMapper<ReasonModel> getReason() {
	RowMapper<ReasonModel> orderMapper = new RowMapper<ReasonModel>() {

	    @Override
	    public ReasonModel mapRow(ResultSet rs, int arg1) throws SQLException {
		ReasonModel reason = new ReasonModel();
		reason.setSplrShrtRsnCd(rs.getString(Constants.SPLR_SHRT_RSN_CD));
		reason.setSplrShrtRsnDes(rs.getString(Constants.SPLR_SHRT_RSN_DES));
		return reason;
	    }

	};
	return orderMapper;
    }

}
