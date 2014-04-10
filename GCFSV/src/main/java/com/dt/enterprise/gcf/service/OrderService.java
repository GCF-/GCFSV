package com.dt.enterprise.gcf.service;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dt.enterprise.gcf.dao.OrderHeaderDAO;
import com.dt.enterprise.gcf.model.vo.ReasonModel;
import com.dt.enterprise.gcf.utils.GCFException;

@Service
public class OrderService {

	private static final Logger LOG = Logger.getLogger(OrderService.class);

    @Autowired
    private OrderHeaderDAO orderDao;

    /**
     * get list Reason from Database.
     * @return List<ReasonModel>
     */
    public List<ReasonModel> getListReason() throws GCFException {
    	return orderDao.getListReason();
    }

}
